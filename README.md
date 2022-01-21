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

## Instalação

> Antes de iniciar a instação das dependências do projeto é necessário realizar instalação do Node.js versão LTS em sua máquina, caso não tenha em -> https://nodejs.org/en/. Após instalar, seguir os passos abaixo para instalação do projeto.

> Antes de iniciar a instação das dependências do projeto é necessário realizar instalação do Docker-compose em sua máquina, caso não tenha em -> https://docs.docker.com/compose/install/. Após instalar, seguir os passos abaixo para instalação do projeto.

```sh
$ npm install || $ yarn install
```
Para realizar a instalação das dependências do projeto é necessário rodar o comando `npm install` ou `yarn install`.
Caso não tenha yarn você pode instalá-lo globalmente utilizando `npm install --global yarn`.

## Container
```sh
$ docker-compose up || $ docker-compose up -d
```
Após realizar a instalação é necessário inicializar o `Docker Compose` que é responsável pelo `Banco de Dados PostgresSQL`
com o comando `docker-compose up` ou `docker-compose up -d` flag `-f` para iniciar em background.

## Migrations
```sh
$ yarn sequelize-cli db:migrate
```
Logo após é necessário subir as nossas migrations (tabelas) em nosso banco de dados utilizando o comando acima.

## Inicializar o Servidor
```sh
$ yarn dev
```
Depois de realizar todos os passos acima, nosso servidor está pronto para ser inicializado através do comando  `yarn dev`.

## Cobertura de Testes
```sh
$ yarn test
```
Para rodar todos os testes da aplicação é necessário rodar o comando `yarn test`.

## Exemplo de chamada a Endpoints

```sh
endpoint: http://localhost:4000:/api/v1/donor
method: GET
query: current: number | pageSize: number | name: string | hasHeader = boolean | delimiter: string
```
> Ao realizar uma chamada para esse endpoint ele irá buscar os registros no banco de dados.

```sh
endpoint: http://localhost:4000:/api/v1/donor
method: POST
enctype: multipart/form-data
```
> Esse endpoint é responsável por receber os dados Donation em arquivo .csv e salvar no banco de dados.


