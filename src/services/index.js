import { LedgerData } from '../db/data/LedgerData'

export class LedgerService {

  static async getLedger() {
    const temp = await LedgerData.getLedger()
    console.log(temp, 7)
    return temp
  }

}