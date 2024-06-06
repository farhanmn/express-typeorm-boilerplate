# Express Boilerplate

An Express Boilerplate with Javascript ES6 style and TypeORM

## Installation

Clone this express-boilerplate with git

```bash
  git clone https://github.com/farhannjb/express-boilerplate
  cd express-boilerplate
  ## rename .env.development to .env
  ## adjust the value inside as you needed
  yarn install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKEN_SECRET`
`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASS`
`DB_NAME`
`DB_DIALECT`

## Tech

- [expressJS](https://expressjs.com/) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [nodemon](https://nodemon.io/) - Simple monitor script for use during development of a Node.js app
- [JWT](https://jwt.io/)[^1] - a compact URL-safe means of representing claims to be transferred between two parties
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [chalk](https://github.com/chalk/chalk#readme) - Terminal string styling done right
- [TypeORM](https://typeorm.io/) - an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES2021)

## Script

- `npm start` - Runs the application using Node.js
- `npm run dev` - Runs the application in development mode with automatic restarts using `nodemon`
- `npm run typeorm:generate` - Generates a new migration file based on changes to the entities
- `npm run typeorm:migrate` - Applies pending migrations to the database

## Authors

- [@farhannjb](https://github.com/farhannjb)

[^1]: On development
