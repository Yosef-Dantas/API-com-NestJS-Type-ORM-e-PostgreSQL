<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">CRUD REST API with NestJS, TypeORM & PostgreSQL</h1>

<p align="center">
A RESTful API developed with <strong>NestJS</strong>, <strong>TypeORM</strong>, and <strong>PostgreSQL</strong>, featuring complete CRUD operations, automatic API documentation with Swagger, environment variable configuration, and Docker integration.
</p>

---

# 📖 Project Description

This project was developed as part of a backend programming assignment.

The application provides a complete REST API for managing data using the CRUD (Create, Read, Update, Delete) pattern. The API was built following NestJS best practices, using TypeORM for database access and PostgreSQL for data persistence.
A key highlight of this API is its Relational Database Design, efficiently handling:

-One-to-One (1:1): Player to Medical Data (Dados Médicos).
-One-to-Many (1:N): Player to Titles (Títulos).
-Many-to-Many (N:N): Players to Sponsors (Patrocinadores).

The project also includes:

- Dockerized PostgreSQL database
- Environment variable configuration
- Data validation using DTOs
- Automatic API documentation with Swagger/OpenAPI
- Layered architecture following NestJS standards

---

# 🚀 Technologies

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker & Docker Compose
- Swagger (OpenAPI)
- Class Validator
- Class Transformer
- dotenv

---

# 📁 Project Structure

```
src/
│
├── jogadores-copa/       # Main module (Players)
├── dados-medicos/        # 1:1 Relation module
├── titulos/              # 1:N Relation module
├── patrocinador/         # N:N Relation module
│
├── app.module.ts
├── main.ts
└── ...
```

---

# ⚙️ Requirements

Before running this project, install:

- Node.js 20+
- npm
- Docker Desktop
- Git

---

# 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project folder:

```bash
cd project-name
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

Example:

```env
APP_PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=crud_db
```

A `.env.example` file is also included as a template.

---

# 🐳 Running PostgreSQL with Docker

Start the database:

```bash
docker compose up -d
```

Verify the container:

```bash
docker ps
```

Stop the database:

```bash
docker compose down
```

---

# ▶️ Running the Application

Development mode:

```bash
npm run start
```

Watch mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

---

# 📚 Swagger Documentation

After starting the application, open:

```
http://localhost:3000/api/jogos
```

Swagger provides:

- Endpoint documentation
- Request body examples
- Response schemas
- Interactive endpoint testing

---

# 🔄 CRUD Endpoints

The API provides the following endpoints:

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/jogadores-copa`     | Create a new player       |
| GET    | `/jogadores-copa`     | Retrieve all players      |
| GET    | `/jogadores-copa/:id` | Retrieve a player by ID   |
| PATCH  | `/jogadores-copa/:id` | Update an existing player |
| DELETE | `/jogadores-copa/:id` | Delete a player           |

---

# 📄 Example Requests

## Create

```http
POST /jogadores-copa
```

```json
{
  "nome": "Lionel Messi",
  "posicao": "Ponta Direita",
  "idade": 39,
  "numero_da_camisa": 10,
  "jogos": 1160,
  "gols": 918,
  "assistencias": 400,
  "nacionalidade": "Argentino",
  "clube": "Inter Miami",
  "valor": "15 milhões",
  "moeda": "USD"
}
```

```http
POST /patrocinador
```

```json
{
  "nome_da_marca": "Nike",
  "ramo_de_atividade": "Material Esportivo",
  "valor": 5000000,
  "data_de_expiracao": "2030",
  "jogadoresIds": ["uuid-jogador-1", "uuid-jogador-2"]
}
```

---

## Get All

```http
GET /jogadores-copa
```

---

## Get by ID

```http
GET /jogadores-copa/1
```

---

## Update

```http
PATCH /jogadores-copa/1
```

```json
{
  "clube": "Barcelona",
  "valor": "20 milhões"
}
```

---

## Delete

```http
DELETE /jogadores-copa/1
```

---

# ✅ Features

- RESTful API
- CRUD operations
- PostgreSQL integration
- TypeORM ORM
- DTO validation
- Global Validation Pipe
- Environment variables
- Docker support
- Swagger documentation
- Modular architecture
- Error handling
- Clean and scalable code

---

# 🧪 Running Tests

Unit tests

```bash
npm run test
```

End-to-end tests

```bash
npm run test:e2e
```

Coverage

```bash
npm run test:cov
```

---

# 📌 Development Notes

This project follows the recommended NestJS architecture:

- Controllers handle HTTP requests.
- Services implement business logic.
- DTOs validate incoming data.
- Entities map database tables.
- TypeORM manages persistence.
- PostgreSQL stores application data.
- Swagger automatically documents the API.

---

# 📖 Useful Resources

- NestJS Documentation: https://docs.nestjs.com
- TypeORM Documentation: https://typeorm.io
- PostgreSQL Documentation: https://www.postgresql.org
- Docker Documentation: https://docs.docker.com
- Swagger/OpenAPI: https://swagger.io

---

# 👨‍💻 Author

Developed by **Yosef Faustiny Dantas Silva**

Backend Development Assignment using NestJS, TypeORM and PostgreSQL.

---

# 📄 License

This project is intended for educational purposes.

Built with ❤️ using NestJS.
