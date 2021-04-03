const DbProvider = require('../providers/DbProvider')
const IdentityHelpers = require('../helpers/IdentityHelpers')

const LEDGER = 'ledger'

const getLedger = async () => {
  const db = await DbProvider.getConnection()
  const temp = await db.select().from(LEDGER)
  console.log(temp, 16)
  return temp
}

const postLedger = async (data) => {
  const db = await DbProvider.getConnection()
  const ledgerEntry = {
    id: IdentityHelpers.generateUUID(),
    item: data.item,
    cost: data.cost,
  }
  await db.insert(ledgerEntry).into(LEDGER)
  return ledgerEntry
}

module.exports = {
  getLedger,
  postLedger
}
