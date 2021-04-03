const Knex = require('knex')


mySqlConnection = {}

const getConnection = async () => {

  if (!this.mySqlConnection) {
    const config = {
      client: 'mysql',
      connection: {
        host: process.env.DB_URI,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
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
