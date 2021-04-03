const express = require('express')
const LedgerService = require('../../services/index')

const router = new express.Router()

router.get('/api', async (req, res) => {
  const ledger = await LedgerService.getActiveLedger()
  res.status(200).json(ledger.sort((a, b) => b.purchaseDate - a.purchaseDate))
})

router.post('/api/ledger', async (req, res) => {
  console.log(req.body, 12)
  res.status(200).json(LedgerService.postLedger(req.body))
})

router.post('/api/ledger/clear', async (req, res) => {
  res.status(200).json(LedgerService.clearLedger())
})

module.exports = router