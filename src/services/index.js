const LongLedgerData = require('../db/data/LongLedgerData')
const ShortLedgerData = require('../db/data/ShortLedgerData')


function convertBinaryIdtoString(ledger) {
  return ledger.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })

}
//LONG LEDGER
const getLedger = async () => {
  const ledger = await LongLedgerData.getLedger()
  return convertBinaryIdtoString(ledger)
}

const updateLedger = async (data) => {
  console.log(data, 19)
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  return await LongLedgerData.updateLedger(data)
}

const clearLedger = async () => {
  return await LongLedgerData.clearLedger()
}


//SHORT LEDGERS
const getLedgers = async () => {
  const ledgers = await ShortLedgerData.getLedgers()
  return ledgers.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const getShortLedgerById = async (id) => {
  const ledger = await ShortLedgerData.getLedgerById(id)
  console.log(ledger, 22)
  return ledger
}

const updateLedgerById = async (data) => {
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  return await ShortLedgerData.updateLedger(data)
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


module.exports = {
  getLedger,
  getLedgers,
  getShortLedgerById,
  updateLedgerById,
  updateLedger,
  createShortLedger,
  clearLedger
}

