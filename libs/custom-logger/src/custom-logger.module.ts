import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import customLoggerConfig from './config/custom-logger.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [customLoggerConfig]
    }),
  ],
  providers: [],
  exports: [],
})
export class CustomLoggerModule { }
