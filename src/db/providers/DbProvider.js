const Knex = require('knex')
const os = require('os');
let db, dbUri, user, password

if (os.hostname().indexOf("local") > -1) {
  db = process.env.DEV_DB
  dbUri = process.env.DEV_DB_URI
  user = process.env.DEV_USER
  password = process.env.DEV_PASSWORD
}
else {
  db = process.env.DB
  dbUri = process.env.DB_URI
  user = process.env.USER
  password = process.env.PASSWORD
}

mySqlConnection = {}

const getConnection = async () => {

  if (!this.mySqlConnection) {
    const config = {
      client: 'mysql',
      connection: {
        host: dbUri,
        port: 3306,
        user: user,
        password: password,
        database: db,
      }
    }
    this.mySqlConnection = Knex(config).on('query-error', function (error, obj, builder) {
    }).on('query-response', function (resp, obj, builder) {
      console.log('Success')
    })
  }
  return this.mySqlConnection
}

module.exports = { getConnection }
