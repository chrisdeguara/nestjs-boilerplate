import { registerAs } from "@nestjs/config";

export default registerAs('webserver', () => ({
    listen: {
        port: parseInt(process.env.WEBSERVER_LISTEN_PORT) || 3000
    }
}));