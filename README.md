# NestJS Auth Module with PostgreSQL and Sequelize

This is a backend project built with [NestJS](https://nestjs.com/), using [Sequelize](https://sequelize.org/) as the ORM and PostgreSQL as the database. The project is implemented in TypeScript and currently includes an authorization module.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/alexandr-229/fans-crm-backend.git
cd fans-crm-backend
npm install
docker-compose up -d
npm run start
```

## Running the App

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

## Environment Variables

You need to set up the following environment variables in a .env file in the root of your project:

DB_HOST=localhost
DB_PORT=5332
DB_USERNAME=admin
DB_PASSWORD=admin
JWT_SECRET=secret

