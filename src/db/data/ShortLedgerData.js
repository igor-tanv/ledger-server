const DbProvider = require('../providers/DbProvider')
const { v4: uuidv4 } = require('uuid');

const LEDGER = 'short_ledger'
const TRANSACTION = 'short_ledger_transaction'

const LedgerStatus = {
  Active: 1,
  Inactive: 2
}

const getLedgers = async () => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).where({ active: 0 })
}

const getLedgerById = async (id) => {
  const db = await DbProvider.getConnection()
  return await db.select().from(LEDGER).where({ id: id })
}

const getTransactionsByLedgerId = async (ledgerId) => {
  return await db.select().from(TRANSACTION).where({ ledger_id: ledgerId })
}

const createLedger = async (data) => {
  const db = await DbProvider.getConnection()
  const ledger = {
    id: uuidv4(),
    users: data.users,
    created_at: data.date,
    active: LedgerStatus.Active
  }
  await db.insert(ledger).into(LEDGER)
  return await db.select().from(LEDGER).where({ id: ledger.id })
}

const updateLedgerById = async (data) => {
  const db = await DbProvider.getConnection()
  const transaction = {
    id: uuidv4(),
    ledger_id: data.ledgerId,
    user: data.user,
    item: data.item,
    cost: data.cost,
  }
  return await db.insert(transaction).into(TRANSACTION)
}



module.exports = {
  getLedgers,
  getLedgerById,
  createLedger,
  updateLedgerById,
  getTransactionsByLedgerId
}