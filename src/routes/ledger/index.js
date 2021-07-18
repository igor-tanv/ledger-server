const express = require('express')
const LedgerService = require('../../services/index')

const router = new express.Router()

router.get('/api', async (req, res) => {
  const ledger = await LedgerService.getActiveLedger()
  res.status(200).json(ledger.sort((a, b) => b.purchase_date - a.purchase_date))
})

router.get('/api/ledger/temp', async (req, res) => {
  const ledgers = await LedgerService.getActiveTempLedgers()
  res.status(200).json(ledgers)
})

router.get('/api/ledger/temp/:id', async (req, res) => {
  console.log(req.params.id, 17)
  const ledger = await LedgerService.getTempLedgerById(req.params.id)
  res.status(200).json(ledger)
})

router.post('/api/ledger', async (req, res) => {
  res.status(200).json(LedgerService.postLedger(req.body))
})

router.post('/api/ledger/temp', async (req, res) => {
  console.log(req.body)
  res.status(200).json(LedgerService.createTempLedger(req.body))
})

router.post('/api/ledger/clear', async (req, res) => {
  res.status(200).json(LedgerService.clearLedger())
})

module.exports = router