# Description
## fifty-milions-dummy

This is repo running with NodeJS

## Setup

**Requirement**:

- node >= 16.19
- docker >= 3.8
- docker-compose: >= 1.29
- npm => 8.19

**Step 1:**
After you clone the repo, please creating `.env` file in the root folder

Copy and paste:
```
DEV_APP_PORT=
DEV_DB_HOST=
DEV_DB_PORT=
DEV_DB_NAME=
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
```

**Step 2**
<h3>Database</h3>

Note: We are using MySQL as our storage database. In order to run MySQL, you will need to download Docker. Then, run the following command:

## Running the app

```bash
make build_application

# development
$ npm install
$ npm run migrate
$ npm run seed

$ npm run start:dev

# Because Point table contains 50 millions record, I have to use worker_thread to migrate and seed database.
$ node /src/workers/index.js

*Note*:
If you have error with database, please executing these lines to migrate and seed your database again.
$ npm run migrate:reset
$ npm run seed:reset
```

## Documentation API
```
Swagger: http://localhost:3000/docs
```
