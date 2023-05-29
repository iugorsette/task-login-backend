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

 - User Registration: 
 ``` 
 POST /api/register
 ```
 - Authentication:
``` 
 POST /api/login
 ```
