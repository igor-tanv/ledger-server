const express = require('express')
const LedgerService = require('../../services/index')

const router = new express.Router()

//LONG LEDGER
router.get('/api', async (req, res) => {
  const ledger = await LedgerService.getLedger()
  res.status(200).json(ledger)
})

router.get('/api/users', async (req, res) => {
  const users = await LedgerService.getLedgerUsers()
  res.status(200).json(users)
})

router.post('/api/ledger', async (req, res) => {
  res.status(200).json(LedgerService.updateLedger(req.body))
})

router.post('/api/ledger/clear', async (req, res) => {
  res.status(200).json(LedgerService.clearLedger())
})

//SHORT LEDGERS
router.get('/api/ledger/short', async (req, res) => {
  const ledgers = await LedgerService.getActiveShortLedgers()
  res.status(200).json(ledgers)
})

router.get('/api/ledger/short/:id', async (req, res) => {
  const ledger = await LedgerService.getShortLedgerById(req.params.id)
  res.status(200).json(ledger)
})

router.post('/api/ledger/short', async (req, res) => {
  const newLedger = await LedgerService.createShortLedger(req.body)
  console.log(newLedger)
  res.status(200).json(newLedger)
})

router.post('/api/ledger/short/:id', async (req, res) => {
  const ledger = await LedgerService.updateLedgerById(req.body, req.params.id)
  res.status(200).json(ledger)
})

module.exports = router