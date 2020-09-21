// 操作品类集合数据的Model
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.定义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  parentId: {type: String, required: true, default: '0'}
})

// 3.定义Model(与集合对应，可以操作集合)
const CategoryModel = mongoose.model('categorys', categorySchema)

// 4.向外暴露Model
module.exports = CategoryModel