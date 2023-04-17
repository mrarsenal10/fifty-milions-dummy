# Description
## fifty-milions-dummy

This is repo running with NodeJS 

## Setup

**Requirement**:
- mac or linux
- node >= 16.19
- docker >= 3.8
- docker-compose: >= 1.29
- npm => 8.19

**Step 1:**
After you clone the repo, please creating `.env` file in the root folder

Copy and paste:
```
DEV_APP_PORT=3000
DEV_DB_HOST=localhost
DEV_DB_PORT=33063
DEV_DB_NAME=tnx
DEV_DB_USERNAME=root
DEV_DB_PASSWORD=123456
```

**Step 2**
<h3>Database</h3>

Note: We are using MySQL as our storage database. In order to run MySQL, you will need to download Docker. Then, run the following command:

## Running the app

```bash
make build_application

At the folder root of project, executing these lines:

# development
$ npm install
$ npm run migrate
$ npm run seed

# Because Points table contains 50 million record, I have to use worker_thread to seed the database.
# It takes time to generate data for Points table
$ node src/workers

$ npm run start:dev

*Note*:
If you have error with database, please executing these lines to migrate and seed your database again.
$ npm run migrate:reset
$ npm run seed:reset
```

## Documentation API
```
Swagger: http://localhost:3000/docs
```
