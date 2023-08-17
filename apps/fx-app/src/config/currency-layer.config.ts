import { registerAs } from "@nestjs/config";

export default registerAs('currencylayer', () => ({
    api: {
        baseUrl: process.env.CURRENCY_LAYER_API_BASE_URL || 'https://api.currencylayer.com',
        key: process.env.CURRENCY_LAYER_API_KEY
    }
}));