import { registerAs } from "@nestjs/config";

export default registerAs('db', () => ({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'passowrd123',
    database: process.env.DB_DATABASE || 'nest'
}));