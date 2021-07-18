const LedgerData = require('../db/data/LedgerData')


const getActiveLedger = async () => {
  const ledger = await LedgerData.getActiveLedger()
  return ledger.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const getActiveTempLedgers = async () => {
  const ledgers = await LedgerData.getActiveTempLedgers()
  return ledgers.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const postLedger = async (data) => {
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  return await LedgerData.postLedger(data)
}

const createTempLedger = async (data) => {
  data.date = new Date(data.date).getTime()
  return await LedgerData.createTempLedger(data)
}

const clearLedger = async () => {
  return await LedgerData.clearLedger()
}

module.exports = {
  getActiveLedger,
  getActiveTempLedgers,
  postLedger,
  createTempLedger,
  clearLedger
}

