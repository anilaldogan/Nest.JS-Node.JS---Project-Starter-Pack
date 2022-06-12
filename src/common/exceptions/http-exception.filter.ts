import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Internal server error[${statusCode}] route to {${request.url}, ${request.method}}`,
        exception.stack,
        'AllExceptionFilter',
      );
    }

    response.status(statusCode).json({
      success: statusCode.toString().indexOf('2') == 0 ? true : false,
      path: request.url,
      timestamp: new Date().toISOString(),
      method: request.method,
      statusCode,
      response: { message },
    });
  }
}
