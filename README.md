This is a simple example backend for TODO app written in express using mysql as a DB. I used docker-compose to run app in a container so you don't need to install and set up database on your own.

App uses [express validator](https://express-validator.github.io/docs) for input validation and sanitization and [helmet](https://helmetjs.github.io) for adding security headers.

For this is just a test app I added .env file to the code structure and pushed it to this repo. <b>This should not be the case in real scenario</b>

## How to run this example:

To run this app you will need to install docker and docker-compose.

From root directory of this project run:

`docker-compose up`

this should start todo list app and mysql database in a container. on database initiation, sql script is ran to set schema required for it to operate correctly.

This container stores app state. If you want to run it from scratch you can remove DB container and build it again:

`docker rm todo-db-1`

_todo-db-1_ is your mysql container name you will find after running `docker ps`

## Requests collection

I also attatch requests collection from Insomnia HTTP Client to make testing of the API easier:

HAR_HTTP format should be accepted on import by both Insomnia and Postman

## Using endpoints

Before doing CRUD actions on endpoints you need to genereate JWT token.
Then use token in authorisation header.

This app only uses authorization without authentication which should be extended in real life to keep record of users in database to allow for authentication and whitelisting to invalidate tokens when needed.
