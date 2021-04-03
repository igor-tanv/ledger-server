const LedgerData = require('../db/data/LedgerData')

const getActiveLedger = async () => {
  const ledger = await LedgerData.getActiveLedger()
  return ledger.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const postLedger = async (data) => {
  return await LedgerData.postLedger(data)
}

const clearLedger = async () => {
  return await LedgerData.clearLedger()
}

module.exports = {
  getActiveLedger,
  postLedger,
  clearLedger
}

