# hello-world

## Install

### Download source files

```bash
# clone repository
git clone https://github.com/amokrushin/hello-world
```

### Install project dependensies

```bash
cd hello-world
npm i --production
```

### Configure application

Edit ENV variables in the `ecosystem.config.js` file, as minimum replace `PGPASSWORD` with the actual one

Configure nginx, sample config provided in files

* hello-world.nginx.conf
* hello-world.nginx-ssl.conf

replace `server_name` with actual one

```bash
    # test nginx configuration
    sudo nginx -t
    # then reload nginx service if configuration is valid
    sudo service nginx reload
```

### Optional. Setup PostgreSQL database [container](https://hub.docker.com/_/postgres/)

```bash
# pull postgres docker image
docker pull postgres:latest

# run postgres container
docker run --rm --name hello-world-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:alpine

# init database with a sample data
PGPASSWORD=mysecretpassword npm run dev-db-init

# stop and remove docker container after all
docker stop hello-world-postgres
```

## CLI

### Start application

```bash
npm start
```

### Stop application

```bash
npm stop
```

### Restart/reload application

```bash
npm restart
npm run reload
```

[Difference between restart and reload](http://pm2.keymetrics.io/docs/usage/cluster-mode/#reload)

### Start application in the development mode

```bash
npm run start-dev
```

PM2 will automatically restart application when a file is modified in the current directory or its subdirectories
