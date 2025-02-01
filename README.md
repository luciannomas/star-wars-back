<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Esta aplicación es una API RESTful construida con NestJS que interactúa con la API pública de Star Wars (SWAPI) y una base de datos MongoDB para gestionar información sobre películas de Star Wars. La aplicación permite obtener detalles personajes y peliculas dado su ID para crear nuevas entradas en la base de datos.

Rutas de la Aplicación:

GET /ask/films/:id

Descripción: Obtiene los detalles de una película específica por su ID.
Parámetros:
id (string): El ID de la película que se desea obtener.
Respuesta: Devuelve un objeto Film con los detalles de la película.
Ejemplo de Uso: 
  curl -X GET https://star-wars-back-production.up.railway.app/ask/films/1


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


GET /ask/people/:id

Descripción: Obtiene los detalles de un personaje específico por su ID.
Parámetros:
id (string): El ID del personaje que se desea obtener.
Respuesta: Devuelve un objeto Person con los detalles del personaje.
Ejemplo de Uso:
curl -X GET https://star-wars-back-production.up.railway.app/ask/people/1

## Project local setup 

```bash
$ npm install
```

## Compile and run the project

```bash
# watch mode
$ npm run build
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Deployment
Esta applicación esta subida a railway: https://star-wars-back-production.up.railway.app/