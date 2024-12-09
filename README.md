# REST API NODE TS SERVER
## Description
### In this project, we worked with dependencies such as:
* express
* express-validator
* sequelize
* sequelize-typescript
* swagger-jsdoc
* swagger-ui-express
* cors
* colors
* morgan
### Also we worked with development depenncies such as:
- @types/express
- @types/jest
- @types/supertest
- @types/swagger-jsdoc
- @types/swagger-ui-express
- jest
- nodemon
- supertest
- ts-jest
- ts-node
- typescript
- @types/cors
- @types/morgan
## How about it goes this project:
This project has the purpose to create a REST API, which works appropriately when data are coming into Postgre database, executing operations such as: 
- Get
![Getting json data](../media/datajson.png?raw=true)
- Get by product by ID
![Get by product by ID](../media/getdata.png?raw=true)
- Insert
![Inserting json data](../media/postdata.png?raw=true)
- Updating with put method
![Updating json data](../media/updateput.png?raw=true)
- Updating with patch method
![Updating json data](../media/updatepatch.png?raw=true)
- Delete
![Deleting json data](../media/delete.png?raw=true)

This is can be acceded from another API with the objective of reading, writing, updating and deleting data to the database. Among the methods that have been used for working with the database are:
* Get
* Post
* Put
* Patch
* Delete
## About the deployment
As this project had been created using **Node.Js**, the most appropriately would be to use a server that works with **Node**, these servers could be for example **[railway](https://railway.app/)**, **[Fl0](https://www.fl0.com/)**, **[render](https://render.com/)**, and so on.
In order to build this project, we use the next command combination:
```
npm install && npm run dev
```
We start the project with the command:
```
node dist/index.js
```
Something very important are the environment variables, the environment variables used by this project are the following:
- **DATABASE_URL**: this variable allows us to connect to a database server both in local as online, and this database can be MySQL, PostgresSQL or any database that we can connect, using [sequelize](https://sequelize.org/docs/v6/getting-started/) framework.
-**PORT**: this is number provided by our hosting and can be for example ```3000``` or ```10000``` and so on.
-**FRONTEND_URL**: this is the url that provides our hosting services and should be for example ```https://example.com``` or ```http://localhost:5173``` but in both cases can never be for example ~~```https://example.com/```~~ or ~~```http://localhost:5173/```~~, it means the url without '/' to the end of the url.

This project was built using Node.js and Typescript technologies.