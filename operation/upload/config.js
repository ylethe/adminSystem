const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'Nd_ua5NFJ7i1sB2wzjoun2ZXBGw7mfNwVIvriVML'
const secretKey = 'jnhBbs-UdBGDgq6j245xjCxNoiO50RIFoVXA7MUK'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'lethe',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}