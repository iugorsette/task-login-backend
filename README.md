# API REST for User Registration and Authentication

## 📝 <a href="docs/Description.md"> Description</a>

## Technologies Used
 - NodeJS
    - Express
    - Mongoose
    - Bcryptjs
    - Jsonwebtoken
    - Cors
    - Ts-node-dev
    - Dotenv
    - Docker
    - zod
    - Jest (Unit Tests) with Babel
 - Database
    - MongoDB

## 🚀 How to Run the Project

- Clone the repository
```bash
git clone https://github.com/iugorsette/login-backend.git
```
- Install dependencies with the following command:
```bash
npm install
```
- Create a .env file in the root of the project and fill it with the environment variables (refer to the .env.example file)
- Run the project with the following command:
```bash
npm run build:dev
```

## How to Run the Project with Docker
- Clone the repository
```bash
git clone https://github.com/iugorsette/login-backend.git
```
- Install dependencies with the following command:
```bash
npm install
```
- Create a .env file in the root of the project and fill it with the environment variables (refer to the .env.example file)
- Run the project with the following command:
```bash
docker-compose up -d
```


## 📍 Routes

### User Registration and Authentication

### ⬆ POST /register
- Header
   - Content-Type: application/json
- Body
```
{
	"name":"Iugor Sette",
	"email": "setteiugor@email.com",
	"password":"SenhaForte123",
	"confirmPassword":"SenhaForte123"
}
```
Response
``` 
Status: 201 Created
{
	"message": "Cadastro realizado com sucesso",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibm92byB1c3VhcmlvIiwiaWQiOiI2NGFlZDhhNDEzZjdkY2JhZTIwNWFlYjciLCJpYXQiOjE2ODkxODAzMjR9.wC7U3TJfcNjn5rVrhQtPoY2r_a95_LpDmF5zj1H54GY"
}
```
### ⬆ POST /login
- Header
   - Content-Type: application/json
- Body
```
{
  "email": "iugorsette@example.com",
  "password": "SenhaForte123"
}
```
Response
``` 
Status: 200 OK
{
	"name": "Iugor Sette",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
}
```

---
### Tasks
⚠ Authentication required
### ⬇ GET /tasks

Response
``` 
Status: 200 OK
{
	"tasks": [
		{
			"_id": "64aea6a4bea184a5960c995f",
			"title": "Teste1",
			"description": "Fazer tal tarefa",
			"status": "active"
		},
		{
			"_id": "64aed639a81e60be6e559681",
			"title": "Teste7",
			"description": "Fazer tal tarefa",
			"status": "pending"
		}
	]
}
```

> GET /tasks/:id  🚧 not implemented yet

##### Retorna uma tarefa específica pelo seu ID.

> POST /tasks
##### Create new task.

PUT /tasks/:id
Atualiza uma tarefa existente pelo seu ID.

DELETE /tasks/:id
Exclui uma tarefa pelo seu ID.

API de Usuários (Users)
Rotas
POST /register
Registra um novo usuário.

POST /login
Realiza o login do usuário.
