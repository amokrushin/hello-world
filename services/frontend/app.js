const express = require('express');
const http = require('http');
const morgan = require('morgan');

const {
    APP_PORT,
    BACKEND_PROTO = 'http:',
    BACKEND_HOST = 'localhost',
    BACKEND_PORT = 3000,
} = process.env;

const app = express();
const server = http.createServer(app);

// use HTTP requests logger middleware
app.use(morgan('dev'));

app.get('/users', async (req, res, next) => {
    http.request({
            protocol: BACKEND_PROTO,
            host: BACKEND_HOST,
            port: BACKEND_PORT,
            path: req.url,
        },
        (response) => {
            response.pipe(res)
        })
        .on('error', (err) => {
            if (err.code === 'ECONNREFUSED') {
                next(new Error('Backend is down'));
            } else {
                next(err);
            }
        })
        .end();
});

app.get('/user/:id', async (req, res, next) => {
    http.request({
            protocol: BACKEND_PROTO,
            host: BACKEND_HOST,
            port: BACKEND_PORT,
            path: req.url,
        },
        (response) => {
            response.pipe(res)
        })
        .on('error', (err) => {
            if (err.code === 'ECONNREFUSED') {
                next(new Error('Backend is down'));
            } else {
                next(err);
            }
        })
        .end();
});

// Catch system error and send response with HTTP status code and error message
// Output error info to the console
app.use((err, req, res, next) => {
    res.status(500).json(err.message);
    console.error(err);
});

server.listen(APP_PORT, () => {
    console.log(`hello-world-frontend app listening on port ${APP_PORT}!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Signal SIGINT received. Shutting down...');
    server.close((err) => {
        const code = err ? 1 : 0;
        console.log('Exit', code);
        process.exit(code);
    });
});