module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // Frontend service
        {
            name: 'hello-world-frontend',
            script: 'services/frontend/app.js',
            env: {
                APP_PORT: 3001,
                BACKEND_PORT: 3000,
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },

        // Backend service
        {
            name: 'hello-world-backend',
            script: 'services/backend/app.js',
            env: {
                APP_PORT: 3000,
                PGUSER: 'postgres',
                PGDATABASE: 'postgres',
                PGPASSWORD: 'mysecretpassword',
                PGHOST: 'localhost',
                PGPORT: 5432,
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],
};
