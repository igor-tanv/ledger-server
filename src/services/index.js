const LongLedgerData = require('../db/data/LongLedgerData')
const ShortLedgerData = require('../db/data/ShortLedgerData')
const users = require('../db/data/users')


function convertBinaryIdtoString(data) {
  return data.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    if (row['ledger_id'] !== undefined) { row['ledger_id'] = row['ledger_id'].toString() }
    return row
  })

}
//LONG LEDGER
const getLedger = async () => {
  const ledger = await LongLedgerData.getLedger()
  return convertBinaryIdtoString(ledger).sort((a, b) => b.purchase_date - a.purchase_date)
}

//TODO fix this hack, perhaps store users in the SQL table
const getLedgerUsers = async () => {
  return users
}

const updateLedger = async (data) => {
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  return await LongLedgerData.updateLedger(data)
}

const clearLedger = async () => {
  return await LongLedgerData.clearLedger()
}



//SHORT LEDGERS
const getActiveShortLedgers = async () => {
  const ledgers = await ShortLedgerData.getLedgers()
  return convertBinaryIdtoString(ledgers)
}

const getShortLedgerById = async (id) => {
  let { ledger } = await ShortLedgerData.getLedgerById(id)
  let transactions = await ShortLedgerData.getTransactionsByLedgerId(id)
  ledger = convertBinaryIdtoString(ledger)[0]
  transactions = convertBinaryIdtoString(transactions).sort((a, b) => b.purchase_date - a.purchase_date)
  return { ledger, transactions }
}

const updateLedgerById = async (data, ledgerId) => {
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  await ShortLedgerData.updateLedgerById(data, ledgerId)
  return await getShortLedgerById(ledgerId)
}

const createShortLedger = async (data) => {
  function formatUserString(users) {
    return users.replace(/[,.;]/g, '')
      .replace(/\s\s+/g, ' ')
      .toLowerCase()
      .trim()
  }
  data.users = formatUserString(data.users)
  data.date = new Date(data.date).getTime()
  const newLedger = await ShortLedgerData.createLedger(data)
  return convertBinaryIdtoString(newLedger)
}

const deleteShortLedgerById = async (id) => {
  return await ShortLedgerData.deleteShortLedgerById(id)
}


module.exports = {
  getLedger,
  getLedgerUsers,
  getActiveShortLedgers,
  getShortLedgerById,
  updateLedgerById,
  updateLedger,
  createShortLedger,
  clearLedger,
  deleteShortLedgerById
}

