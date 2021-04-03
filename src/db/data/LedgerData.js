import { DbProvider } from '../providers/DbProvider'
import { IdentityHelpers } from '../../helpers/IdentityHelpers'

const LEDGER = 'ledger'

const OrderStatus = {
  Preparing = 1,
  Ready = 2,
  Cancelled = 3,
}
export class LedgerData {

  static async getLedger() {
    const db = await DbProvider.getConnection()
    const temp = await db.select().from(LEDGER)
    console.log(temp, 16)
    return temp
  }

  static async postLedgerEntry(data) {
    const db = await DbProvider.getConnection()
    const ledgerEntry = {
      id: IdentityHelpers.generateUUID(),
      item: data.item,
      cost: data.cost,
    }
    await db.insert(ledgerEntry).into(LEDGER)
    return ledgerEntry
  }
}