const LedgerData = require('../db/data/LedgerData')

const getLedger = async () => {
  const temp = await LedgerData.getLedger()
  console.log(temp, 7)
  return temp
}

const postLedger = async (data) => {
  console.log(data, 10)
  const temp = await LedgerData.postLedger(data)
  console.log(temp, 7)
  return temp
}

module.exports = {
  getLedger,
  postLedger
}

