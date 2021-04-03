const LedgerData = require('../db/data/LedgerData')

const getLedger = async () => {
  return await LedgerData.getLedger().map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
}

const postLedger = async (data) => {
  return await LedgerData.postLedger(data)
}

module.exports = {
  getLedger,
  postLedger
}

