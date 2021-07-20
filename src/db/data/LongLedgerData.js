const DbProvider = require('../providers/DbProvider')
const { v4: uuidv4 } = require('uuid');

const LEDGER = 'long_ledger'

const LedgerEntryStatus = {
  Pending: 1,
  Cleared: 2
}

const getLedger = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).where({ cleared: 0 })
}

const updateLedger = async (data) => {
  const db = await DbProvider.getConnection()
  const ledgerEntry = {
    id: uuidv4(),
    user: data.user,
    item: data.item,
    cost: data.cost,
    purchase_date: data.purchaseDate,
    cleared: LedgerEntryStatus.Pending
  }
  return await db.insert(ledgerEntry).into(LEDGER)
}

const clearLedger = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).update({ cleared: LedgerEntryStatus.Cleared })
}


module.exports = {
  getLedger,
  updateLedger,
  clearLedger
}
