# Budding API

[Budding API](https://budding-app.herokuapp.com/api)

An API to serve endpoints to the [Budding App](https://github.com/thorners55/budding-front-end)

## Getting Started

```bash
git clone https://github.com/thorners55/budding-back-end
```

### Prerequisites

```
node v12
npm v6.14.5
postgresql v12.2
```

### Installing

```
npm install
```

### Database Setup

Add a knexfile.js in the root directory and add the following code.

- user and password should be your postgres credentials (not required for mac users)

```js
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  development: {
    connection: {
      database: 'budding_app',
      // user,
      // password
    },
  },
  test: {
    connection: {
      database: 'budding_app_test',
      // user,
      // password
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

Create databases

```
npm run setup-dbs
```

Seed databases

```
npm run seed:test
npm run seed:dev
```

### Starting The Server

```
npm run dev-server
```

## Running Tests

```
npm test
```

## Built With

- [express](https://expressjs.com/)
- [jest](https://jestjs.io/)
- [knex](http://knexjs.org/)
- [node-postgres](https://node-postgres.com/)
- [supertest](https://github.com/visionmedia/supertest)

## Authors

- **Stephanie Thornley** - [thorners55](https://github.com/thorners55)
- **Zach Pinfold** - [ZachPinfold](https://github.com/ZachPinfold)
- **Joao Mak** - [joao-mak](https://github.com/joao-mak)
- **Richard Bacon** - [richardjohnbacon](https://github.com/richardjohnbacon)
