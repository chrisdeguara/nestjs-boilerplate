import { registerAs } from "@nestjs/config";

export default registerAs('logger', () => ({
    combinedFilePath: process.env.LOGGER_COMBINED_FILE_PATH || 'logs/combined.log',
    errorFilePath: process.env.LOGGER_ERROR_FILE_PATH || 'logs/error.log',
}));