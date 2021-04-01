import Knex from 'knex'

export class DbProvider {
  static mySqlConnection = {}

  static async getConnection() {

    if (!this.mySqlConnection) {
      const config = {
        client: 'mysql',
        connection: {
          host: process.env.DATABASE_URL,
          port: 3306,
          user: 'admin',
          password: process.env.PASSWORD,
          database: 'restaurant',
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
}