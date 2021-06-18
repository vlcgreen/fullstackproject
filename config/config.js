const env = require('./env.js')

module.exports = {
  "development": {
    "username": "pfaptxzb",
    "password": env.DB_PASSWORD,
    "database": "pfaptxzb",
    "host": "batyr.db.elephantsql.com",
    "dialect": "postgres"
  }
} 

