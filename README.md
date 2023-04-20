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

<h3>Database</h3>

Note: We are using MySQL as our storage database. In order to run MySQL, you will need to download Docker.

## Running the app

At the folder root of project, executing these lines:

# development
```bash
$ make build_application
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

## Screenshot
```
Please refer to TNX.pdf
```
## Improvement
Using RAM memory to speed up the inserting and selecting data
Using the better structure data to reduce time complexity
