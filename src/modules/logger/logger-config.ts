import { transports, format } from 'winston';
import { ConfigService } from '@nestjs/config';

export function createLoggerConfig(configService: ConfigService) {
  return {
    transports: [
      new transports.File({
        filename: configService.get('logger.errorFilePath'),
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.File({
        filename: configService.get('logger.combinedFilePath'),
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp(),
          format.printf((info) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  };
}
