// 处理文件上传的路由器模块
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // destination值为函数时需手动创建文件夹
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const upload = multer({storage})
const uploadSingle = upload.single('image')

module.exports = function fileUpload(router) {
  // 上传图片
  router.post('/manage/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) {
      if (err) {
        return res.send({
          status: 1,
          msg: '上传图片失败'
        })
      }
      let file = req.file
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:5000/upload/' + file.filename
        }
      })

    })
  })

  // 删除图片
  router.post('/manage/img/delete', (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 1,
          msg: '删除图片失败'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })
}
