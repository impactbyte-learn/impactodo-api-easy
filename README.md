# Impact Todo API (Easy version)

[![Greenkeeper badge](https://badges.greenkeeper.io/impactbyte-learn/impactodo-api-easy.svg)](https://greenkeeper.io/)

* [MongoDB](https://mongodb.com)
* [`mongodb`](https://www.npmjs.com/package/mongodb)

## App Structure

```txt
index.ts
▼
TypeORM connection
├─ Express configuration
├─── app.use(...)
└─── app.use("/todos", TodoRoutes)
▼
routes
├─ TodoRoutes
├─── router.get("/", TodoController.findAll)
└─── router.post("/", TodoController.create)
▼
controller
├─ TodoController
├─── findAll(req, res, next) => { Todo.find ... res.send(todos) }
└─── create(req, res, next) => { newTodo.save ... res.send(newTodo) }
▼
entity
├─ Todo
├─── @IdColumn id: number / ObjectID
└─── @Column text: string
▼
database
├─ MongoDB
├─── localhost:27017/impactodo
├─ PostgreSQL
├─── localhost:5432/impactodo
├─ MySQL
└─── localhost:3306/impactodo
```

## How to Run

Database:

```sh
sudo service mongod start
sudo service postgresql start
```

Installation:

```sh
npm install
```

Development:

```sh
npm run dev
```

Start:

```sh
npm run start
```
