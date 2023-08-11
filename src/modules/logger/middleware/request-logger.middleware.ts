import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      switch(res.statusCode) {
        case 401:
        case 404:
        case 405:
          this.logger.warn(`[${req.method}] ${req.url} - ${res.statusCode}`);
          break;
        case 200:
        case 304:
          this.logger.log(`[${req.method}] ${req.url} - ${res.statusCode}`);
      }
    });

    next();
  }
}