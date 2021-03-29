/*
 * Library for storing and editing data
 *
 */

// Dependencies
let fs = require('fs').promises;
let path = require('path');

// Container for module (to be exported)
let LedgerService = {};

// Base directory of db folder
let ledgerEntryDir = path.join(__dirname, '../db/ledger-entries');

// Return a list of all ledger entries
LedgerService.read = async () => {
  let ledgerList = []
  const files = await fs.readdir(ledgerEntryDir)
  for (let i = 0; i < files.length; ++i) {
    const file = files[i]
    const rawdata = await fs.readFile(ledgerEntryDir + '/' + file)
    ledgerList.push(JSON.parse(rawdata))
  }
  return ledgerList.filter((ledgerItem) => ledgerItem.cleared != true)
}

LedgerService.clear = async () => {
  const files = await fs.readdir(ledgerEntryDir)
  for (let i = 0; i < files.length; ++i) {
    const rawdata = await fs.readFile(ledgerEntryDir + '/' + files[i])
    const file = (JSON.parse(rawdata))
    file.cleared = true
    await fs.writeFile(ledgerEntryDir + '/' + file.createdAt + '.json', JSON.stringify(file, null, 2));
  }
  return this.read()
}

// Write data to a file
LedgerService.create = async (newEntry) => {
  newEntry.purchaseDate = new Date(newEntry.purchaseDate).getTime()
  newEntry.cleared = false
  newEntry.createdAt = new Date(newEntry.createdAt).getTime()
  await fs.writeFile(ledgerEntryDir + '/' + newEntry.createdAt + '.json', JSON.stringify(newEntry, null, 2))
  return newEntry
}

// Export the module
module.exports = LedgerService
