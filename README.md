## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Setup

### Connect to Postgres

Create a new database. Connect to Postgres and run: `create database fantasy_map;`

### Create config files

- Make a copy of `src/db/config.json.example`, rename it to `config.json` and replace sample data by your database credentials.

- Make a copy of `env/example.env.example`, rename it to `development.env` and replace sample data by actual config.

### Run migrations

`npx sequelize-cli db:migrate`

### Seeding database

`npx sequelize-cli db:seed:all`

### Run server

`npm run dev`

### Extra

If you need to delete all tables and swipe the whole data: `npx sequelize-cli db:migrate:undo:all`
