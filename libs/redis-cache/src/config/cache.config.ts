import { registerAs } from "@nestjs/config";

export default registerAs('cache', () => ({
    ttl: parseInt(process.env.CACHE_TTL) || 60,
    redis: {
        host: process.env.CACHE_REDIS_HOST || 'localhost',
        port: parseInt(process.env.CACHE_REDIS_PORT) || 6379,
        db: parseInt(process.env.CACHE_REDIS_DB) || 0
    }
}));