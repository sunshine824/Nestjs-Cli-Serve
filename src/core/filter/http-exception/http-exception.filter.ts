import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    // 用于接收主动发错的错误信息
    const { message, code } = exception.getResponse() as any;
    // 判断是否是swagger返回错误
    const isArray = message instanceof Array;
    // 设置错误信息
    const errorResponse = {
      data: null,
      message: isArray ? message[0] : message,
      code: code || status,
    };

    // 设置返回的状态码、请求头、发送错误信息
    response.status(isArray ? 200 : status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
