import { registerAs } from "@nestjs/config";

export default registerAs('fixer', () => ({
    api: {
        baseUrl: process.env.FIXER_API_BASE_URL || 'http://data.fixer.io',
        key: process.env.FIXER_API_KEY
    }
}));