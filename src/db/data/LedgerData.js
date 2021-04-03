const DbProvider = require('../providers/DbProvider')
const { v4: uuidv4 } = require('uuid');

const LEDGER = 'ledger'

const getLedger = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER)
}

const postLedger = async (data) => {
  const db = await DbProvider.getConnection()
  const ledgerEntry = {
    id: uuidv4(),
    user: data.user,
    item: data.item,
    cost: data.cost,
    purchase_date: data.purchaseDate
  }
  return await db.insert(ledgerEntry).into(LEDGER)
}

module.exports = {
  getLedger,
  postLedger
}
