const LedgerData = require('../db/data/LedgerData')

const getLedger = async () => {
  const ledger = await LedgerData.getLedger()
  console.log(ledger, 5)
  const newLedger = ledger.map((row) => {
    if (row['id'] !== undefined) { row['id'] = row['id'].toString() }
    return row
  })
  console.log(newLedger, 10)
  return newLedger
}

const postLedger = async (data) => {
  return await LedgerData.postLedger(data)
}

module.exports = {
  getLedger,
  postLedger
}

