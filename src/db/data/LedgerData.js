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

  static async getOrderItems(orderId) {
    const db = await DbProvider.getConnection()
    return await db(ORDER_ITEM).where({ order_id: orderId })
  }

  static async updateOrder(orderId) {
    const db = await DbProvider.getConnection()
    await db(ORDER).where({ id: orderId }).update({ status: OrderStatus.Ready })
    return this.getOrder(orderId)
  }

  static async placeOrder(data) {
    const db = await DbProvider.getConnection()
    const order = {
      id: IdentityHelpers.generateUUID(),
      status: OrderStatus.Preparing
    }
    const rows = data.map((row) => ({
      order_id: order.id,
      item_id: row.id,
      item_count: row.count
    }))

    await db.insert(order).into(ORDER)
    await db.batchInsert(ORDER_ITEM, rows)

    return order
  }
}