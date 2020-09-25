// 操作订单集合数据的Model
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.定义Schema(描述文档结构)
const orderSchema = new mongoose.Schema({
  orderId: {type: String}, // 订单号
  orderTime: {type: Number, default: Date.now}, // 下单时间
  productName: {type: String}, // 商品名
  role_id: {type: String}, // 商品分类
  productCount: {type: Number}, // 商品数量
  orderPrice: {type: String}, // 订单价格
})

// 3.定义Model(与集合对应，可以操作集合)
const OrderModel = mongoose.model('orders', orderSchema)

// 4.向外暴露Model
module.exports = OrderModel