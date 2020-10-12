// 操作订单集合数据的Model
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.定义Schema(描述文档结构)
const orderSchema = new mongoose.Schema({
  orderTime: {type: Number, default: Date.now}, // 下单时间
  productName: {type: String}, // 商品名
  username: {type: String}, // 下单用户
})

// 3.定义Model(与集合对应，可以操作集合)
const OrderModel = mongoose.model('orders', orderSchema)

// 4.向外暴露Model
module.exports = OrderModel