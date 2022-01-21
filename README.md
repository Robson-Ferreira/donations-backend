# Donation

## Stack
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://www.npmjs.com/package/nodemonp)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize ORM](https://sequelize.org/)
- [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yup](https://github.com/jquense/yup)
- [Jest](https://jestjs.io/pt-BR/)

## Installation

> Before starting the installation of the project's dependencies, it is necessary to install the Node.js LTS version on your machine, if you don't have it at -> https://nodejs.org/en/. After installing, follow the steps below to install the project.

> Before starting the installation of the project's dependencies, it is necessary to install Docker-compose on your machine, if you don't have it at -> https://docs.docker.com/compose/install/. After installing, follow the steps below to install the project.

```sh
$ npm install --save || $ yarn install
```
To install the project's dependencies it is necessary to run the command `npm install --save` or `yarn install`.
If you don't have yarn you can install it globally using `npm install --global yarn`.

## Container
```sh
$ docker-compose up || $ docker-compose up -d
```
After performing the installation, it is necessary to initialize `Docker Compose` which is responsible for the `PostgresSQL Database`
with the command `docker-compose up` or `docker-compose up -d` flag `-f` to start in background.

## Migrations
```sh
$ yarn sequelize-cli db:migrate
```
Soon after it is necessary to upload our migrations (tables) in our database using the command above.

## Start the Server
```sh
$ yarn dev
```
After performing all the steps above, our server is ready to be started using the `yarn dev` command.


## Example of calling endpoints

```sh
endpoint: http://localhost:4000:/api/v1/donor
method: GET
query: current: number | pageSize: number | name: string | hasHeader = boolean | delimiter: string
```
> When making a call to this endpoint it will fetch the records in the database.

```sh
endpoint: http://localhost:4000:/api/v1/donor
method: POST
enctype: multipart/form-data
```
> This endpoint is responsible for receiving the Donation data in a .csv file and saving it to the database.


