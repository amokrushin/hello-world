const express = require('express');
const http = require('http');
const morgan = require('morgan');
const async = require('async');
const pool = require('./lib/database');

const app = express();
const server = http.createServer(app);

const { APP_PORT } = process.env;

// set human readable json response formatting
app.set('json spaces', 4);

// use HTTP requests logger middleware
app.use(morgan('dev'));

app.get('/users', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * from users');
        const users = result.rows;
        res.status(200).json(users);
        next();
    } catch (err) {
        next(err);
    }
});

app.get('/user/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await pool.query('SELECT * from users WHERE id=$1', [userId]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).end(`User with id ${userId} not found in database`);
        } else {
            res.status(200).json(user);
        }
        next();
    } catch (err) {
        next(err);
    }
});

// Catch system error and send response with HTTP status code and error message
// Output error info to the console
app.use((err, req, res, next) => {
    res.status(500).json(err.message);
    console.error(err);
});

server.listen(APP_PORT, () => {
    console.log(`hello-world-backend app listening on port ${APP_PORT}!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Signal SIGINT received. Shutting down...');
    async.series([
        cb => pool.end(cb),
        cb => server.close(cb),
    ], (err) => {
        const code = err ? 1 : 0;
        console.log('Exit', code);
        process.exit(code);
    })
});
