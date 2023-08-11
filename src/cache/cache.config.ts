import { registerAs } from "@nestjs/config";

export default registerAs('cache', () => ({
    ttl: parseInt(process.env.CACHE_TTL) || 60,
    redis: {
        url: process.env.CACHE_REDIS_URL || 'redis://localhost:6379'
    }
}));