// 用来定义路由的路由器模块
const express = require('express')
const md5 = require('blueimp-md5')

const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')

// 得到路由器对象
const router = express.Router()

// 登录
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 根据username和password查询数据库users，如果没有则返回提示错误的信息，如果有则返回包含user的登录成功信息
  UserModel.findOne({username, password: md5(password)})
    .then(user => {
      if (user) { // 登录成功
        // 生成一个cookie(userid:user._id)并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        user._doc.role = {menus: []}
        // 返回包含user的登录成功信息
        res.send({status: 0, data: user})
      } else {// 登录失败
        res.send({status: 1, msg: '用户名或密码不正确'})
      }
    })
    .catch(error => {
      console.error('登录异常', error)
      res.send({status: 1, msg: '登录异常，请重试'})
    })
})

// 获取分类列表
router.get('/manage/category/list', (req, res) => {
  const parentId = req.query.parentId || '0'
  CategoryModel.find({parentId})
    .then(categorys => {
      res.send({status: 0, data: categorys})
    })
    .catch(error => {
      console.error('获取分类列表异常', error)
      res.send({status: 1, msg: '获取分类列表异常，请重试'})
    })
})

// 添加分类
router.post('/manage/category/add', (req, res) => {
  const {categoryName, parentId} = req.body
  CategoryModel.create({name: categoryName, parentId: parentId || '0'})
    .then(category => {
      res.send({status: 0, data: category})
    })
    .catch(error => {
      console.error('添加分类异常', error)
      res.send({status: 1, msg: '添加分类异常，请重试'})
    })
})

// 更新分类名称
router.post('/manage/category/update', (req, res) => {
  const {categoryId, categoryName} = req.body
  CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
    .then(oldCategory => {
      res.send({status: 0})
    })
    .catch(error => {
      console.error('更新分类名称异常', error)
      res.send({status: 1, msg: '更新分类名称异常，请重试'})
    })
})

module.exports = router