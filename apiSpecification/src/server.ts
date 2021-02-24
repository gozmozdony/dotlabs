import { config } from 'dotenv-safe';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import open from 'open';
import glob from 'glob';

config();
const app = express();
const listenPort = process.env.LISTEN_PORT;
const listenUrl = `http://localhost:${listenPort}`;
const services = glob.sync('services/*.yaml');
const urls = services.map((service) => {
    return {
        url: service,
        name: service.split(/[\/\.]/)[1]
    };
});

const options = {
    explorer: true,
    swaggerOptions: {
        urls,
        plugins: [
            "Topbar"
        ],
        deepLinking: true,
        displayOperationId: true,
        showExtensions: true,
        showCommonExtensions: true,
    }
};

app.use(express.static('.'));
app.use('/', serve, setup(null, options as any));
app.listen(process.env.LISTEN_PORT);

console.info(`Swagger UI server is running at ${listenUrl}.`);

open(listenUrl);
