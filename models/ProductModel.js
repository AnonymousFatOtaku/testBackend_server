// 操作商品集合数据的Model
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.定义Schema(描述文档结构)
const productSchema = new mongoose.Schema({
  categoryId: {type: String, required: true}, // 所属分类的id
  pCategoryId: {type: String, required: true}, // 所属分类的父分类id
  name: {type: String, required: true}, // 名称
  price: {type: Number, required: true}, // 价格
  desc: {type: String}, // 描述
  status: {type: Boolean, default: true}, // 商品状态：true为上架，false为下架
  imgs: {type: Array, default: []}, // 多个图片文件名的json字符串
  detail: {type: String} // 详情
})

// 3.定义Model(与集合对应，可以操作集合)
const ProductModel = mongoose.model('products', productSchema)

// 4.向外暴露Model
module.exports = ProductModel