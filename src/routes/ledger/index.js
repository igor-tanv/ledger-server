const express = require('express')
const LedgerService = require('../../services/index')

const router = new express.Router()

router.get('/api', async (req, res) => {
  const ledger = await LedgerService.getLedger()
  console.log(ledger, 8)
  res.status(200).json(ledger.sort((a, b) => b.purchaseDate - a.purchaseDate))
})

router.get('/api/test', async (req, res) => {
  res.status(200).json({ "foo": "bar" })
})

router.post('/api/ledger', async (req, res) => {
  console.log(req.body, 18)
  res.status(200).json(LedgerService.postLedger(req.body))
})

router.post('/api/ledger/clear', async (req, res) => {
  res.status(200).json(LedgerService.clear())
})

module.exports = router