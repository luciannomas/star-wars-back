<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Esta aplicación es una API RESTful construida con NestJS que interactúa con la API pública de Star Wars (SWAPI) y una base de datos MongoDB para gestionar información sobre películas de Star Wars. La aplicación permite obtener detalles personajes y peliculas dado su ID y crear nuevas entradas en la base de datos.

Rutas de la Aplicación:

GET /ask/films/:id

Descripción: Obtiene los detalles de una película específica por su ID.
Parámetros:
id (string): El ID de la película que se desea obtener.
Respuesta: Devuelve un objeto Film con los detalles de la película.
Ejemplo de Uso: curl -X GET https://star-wars-back-production.up.railway.app/ask/films/1

POST /ask/films

Descripción: Crea una nueva entrada de película en la base de datos.
Cuerpo de la Solicitud: Debe incluir un objeto FilmDto con los detalles de la película.
Respuesta: Devuelve el objeto Film creado con los detalles de la película.

Ejemplo de Uso: 
  curl -X POST https://star-wars-back-production.up.railway.app/ask/films -H "Content-Type: application/json" -d '{
  "filmId": 1,
  "title": "A New Hope",
  "episode_id": 4,
  "opening_crawl": "It is a period of civil war...",
  "director": "George Lucas",
  "producer": "Gary Kurtz, Rick McCallum",
  "release_date": "1977-05-25",
  "characters": ["https://swapi.dev/api/people/1/", "https://swapi.dev/api/people/2/"],
  "planets": ["https://swapi.dev/api/planets/1/"],
  "starships": ["https://swapi.dev/api/starships/2/"],
  "vehicles": ["https://swapi.dev/api/vehicles/4/"],
  "species": ["https://swapi.dev/api/species/1/"],
  "created": "2014-12-10T14:23:31.880000Z",
  "edited": "2014-12-20T19:49:45.256000Z",
  "url": "https://swapi.dev/api/films/1/"
}'


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Deployment
Esta applicación esta levantada en un hosting de railway: https://star-wars-back-production.up.railway.app/