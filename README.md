

# Tabela de conteúdos

- [Sobre o projeto](#-sobre-o-projeto-)
- [Funcionalidades](#-funcionalidades)
- [Como executar o projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Criando o Banco de Dados](#user-content--criando-o-banco-de-dados)
  - [Rodando o Backend](#user-content--rodando-o-backend)
- [Tecnologias](#-tecnologias)
  - [Server](#user-content-server--nestjs----typescript)
- [Autor](#-autor)

## 🔵 Sobre o projeto 🔵

API desenvolvida com NestJS + Prisma para gerenciamento de entidades do setor agrícola. Permite operações seguras com autenticação baseada em Keycloak e organização dos dados por agricultor, fazenda, colheita e cultivar.

---

## ⚙️ Funcionalidades

- CRUD completo de agricultores, fazendas, colheitas e cultivares
- Autenticação via Keycloak
- Validação de CPF/CNPJ
- Garantia de integridade de dados nas áreas das fazendas
- Relacionamentos entre produtor, propriedade, safra e cultura
- Filtros e ordenações por nome, estado, ano, etc.

---

## Como executar o projeto

### Pré-requisitos

- Node.js
- PostgreSQL
- NestJS CLI
- Ferramenta de testes de API (Postman ou Insomnia)

### ⚙️ Rodando o Backend

```bash
# Clone o repositório
$ git clone git@github.com:seu-usuario/osiris.git
$ cd osiris

# Instale as dependências
$ npm install

# Configure o .env com sua string do banco e configurações do Keycloak

# Inicie o projeto
$ docker-compose up
```

---

## 🔧 Utilizando a API

### Autenticação

**Login**

```http
POST /account/login
{
  "username": "moises",
  "password": "naoconsegue"
}
```

**Refresh token**

```http
POST /account/refresh-token
{
  "refreshToken": "seu-refresh-token"
}
```

---

### Agricultores

Todas as rotas de agricultores são protegidas, somente usuários admin podem acessar, mas o Moises sempre esta disposto a ajuda.

**Criar**

```http
POST /farmer
{
  "name": "João Silva",
  "identification": "12345678900",
  "email": "joao@email.com",
  "first_access": true,
  "email_checked": false,
  "keycloakId": "uuid-gerado-pelo-keycloak"
}
```

**Listar todos**

```http
GET /farmer?offset=0&limit=10&order=asc&orderBy=name&searchBy=identification&searchFor=123
```

**Buscar por ID**

```http
GET /farmer/{id}
```

**Atualizar**

```http
PUT /farmer
{
  "id": "uuid-do-farmer",
  "name": "João da Silva",
  "email_checked": true
}
```

**Excluir**

```http
DELETE /farmer/{id}
```

---

### Fazendas

**Criar**

```http
POST /farm
{
  "name": "Fazenda Primavera",
  "totalArea": 100.0,
  "farmableArea": 60.0,
  "greenArea": 40.0,
  "state": "MG",
  "city": "Uberlândia",
  "farmerId": "uuid-do-farmer"
}
```

**Listar todos**

```http
GET /farm?orderBy=name&searchBy=state&searchFor=MG
```

**Buscar por ID**

```http
GET /farm/{id}
```

**Atualizar**

```http
PUT /farm
{
  "id": "uuid-da-fazenda",
  "name": "Fazenda Primavera Atualizada",
  "greenArea": 42.0
}
```

**Excluir**

```http
DELETE /farm/{id}
```

---

### Colheitas

**Criar**

```http
POST /harvest
{
  "year": "2024",
  "note": "Colheita de soja",
  "farmId": "uuid-da-fazenda"
}
```

**Listar todos**

```http
GET /harvest?orderBy=note&searchBy=year&searchFor=2024
```

**Buscar por ID**

```http
GET /harvest/{id}
```

**Atualizar**

```http
PUT /harvest
{
  "id": "uuid-da-colheita",
  "note": "Colheita de milho"
}
```

**Excluir**

```http
DELETE /harvest/{id}
```

---

### Cultivares

**Criar**

```http
POST /cultivar
{
  "name": "Milho",
  "cultivatedArea": "25",
  "harvestId": "uuid-da-colheita"
}
```

**Listar todos**

```http
GET /cultivar?orderBy=name&searchBy=cultivatedArea&searchFor=25
```

**Buscar por ID**

```http
GET /cultivar/{id}
```

**Atualizar**

```http
PUT /cultivar
{
  "id": "uuid-da-cultivar",
  "name": "Soja"
}
```

**Excluir**

```http
DELETE /cultivar/{id}
```

---

## 🛠️ Tecnologias

#### **Server** ([Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/))

- [**NestJS**](https://nestjs.com/)
- [**Prisma ORM**](https://www.prisma.io/)
- [**PostgreSQL**](https://www.postgresql.org/)
- [**Keycloak**](https://www.keycloak.org/)
- [**Swagger**](https://swagger.io/tools/swagger-ui/)

---

## 👤 Autor

[Leonardo Afonso](https://github.com/LeonardoSAfonso)

---

