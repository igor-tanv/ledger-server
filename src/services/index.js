const LedgerData = require('../db/data/LedgerData')

const getActiveLedger = async () => {
  const ledger = await LedgerData.getActiveLedger()
  return ledger.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const postLedger = async (data) => {
  console.log(data, 12)
  data.purchaseDate = new Date(data.purchaseDate).getTime()
  console.log(data, 13)
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

