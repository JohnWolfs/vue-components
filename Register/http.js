import axios from 'axios'

var http = {}
var baseURL
// var prods = ['www.caimiaoxingqiu.com', 'm.caimiaoxingqiu.com', 'web.caimiaoxingqiu.com', 'www.wdjzt88.com']
var tests = ['localhost', 'test.wdjzt88.com', '10.100.85.193', 'web.wdjzt88.com', 'dev.caimiaoxingqiu.com']

var baseJSON = {
  'body': {
    'content': {},
    'head': {
      'OSVersion': 'A7.1.1',
      'appVersion': '10.0.6',
      'channel': 'sqtes',
      'clientModel': 'OPPO R11s',
      'device_type': 'Android',
      'packageName': 'com.caimiao.caimiaoxingqiu',
      'uuid': ''
    }
  }
}

if (tests.indexOf(location.hostname) !== -1) {
  baseURL = 'https://dev.caimiaoxingqiu.com'
} else {
  baseURL = 'https://prod.wdjzt88.com'
}

http.getMsgCode = function (option) {
  baseJSON.body.content = {
    phone: option.phone,
    imgcode: option.imgcode,
    type: 1
  }
  return axios.post(baseURL + '/app/captcha', baseJSON)
    .then(res => { return res && res.data.body })
}

http.getImgCode = function (option) {
  baseJSON.body.content = {
    phone: option.phone
  }
  return axios.post(baseURL + '/app/imagecode/index2', baseJSON).then(res => { console.log(res); return res && ('data:image/png;base64,' + res.data.body.content.image) })
}

http.register = function (option) {
  baseJSON.body.content = {
    phone: option.phone,
    code: option.msgcode,
    type: 0
  }
  if (option.invite_uid) baseJSON.body.content.invite_uid = option.invite_uid
  if (option.channel) baseJSON.body.content.channel = option.channel
  return axios.post(baseURL + '/app/user/register', baseJSON)
    .then(res => { return res && res.data.body })
}

export default http
