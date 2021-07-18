const DbProvider = require('../providers/DbProvider')
const { v4: uuidv4 } = require('uuid');

const LEDGER = 'ledger'
const TEMP_LEDGER = 'temp_ledger'

const LedgerEntryStatus = {
  Pending: 0,
  Cleared: 1
}

const TempLedgerStatus = {
  Active: 0,
  Inactive: 1
}

const getActiveLedger = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).where({ cleared: 0 })
}

const getActiveTempLedgers = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(TEMP_LEDGER).where({ active: 0 })
}

const clearLedger = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).update({ cleared: LedgerEntryStatus.Cleared })
}

const postLedger = async (data) => {
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

const createTempLedger = async (data) => {
  const db = await DbProvider.getConnection()
  const tempLedger = {
    id: uuidv4(),
    users: data.users,
    created_at: data.date,
    active: TempLedgerStatus.Active
  }
  console.log(tempLedger, 48)
  return await db.insert(tempLedger).into(TEMP_LEDGER)
}

module.exports = {
  getActiveLedger,
  getActiveTempLedgers,
  postLedger,
  createTempLedger,
  clearLedger,
}
