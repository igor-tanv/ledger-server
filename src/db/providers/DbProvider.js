const Knex = require('knex')
const os = require('os');
let db, dbUri

if (os.hostname().indexOf("local") > -1) {
  db = process.env.DEV_DB
  dbUri = process.env.DEV_DB_URI
}
// Server running on remote server
else {
  db = process.env.DB
  dbUri = process.env.DB_URI
}


mySqlConnection = {}

const getConnection = async () => {

  if (!this.mySqlConnection) {
    const config = {
      client: 'mysql',
      connection: {
        host: dbUri,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: db,
      }
    }
    this.mySqlConnection = Knex(config).on('query-error', function (error, obj, builder) {
      console.log('Error', error)
    }).on('query-response', function (resp, obj, builder) {
      console.log('Success')
    })
  }
  return this.mySqlConnection
}

module.exports = { getConnection }
