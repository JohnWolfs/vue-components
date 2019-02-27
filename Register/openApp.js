var downloadLink = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.qian.xiao.er'
var openAppLink = 'qianxiaoer://launch'

function openApp () {
  window.location.href = openAppLink
  setTimeout(function () {
    window.location.href = downloadLink
  }, 1000)
}
function download () {
  window.location.href = downloadLink
}
export default {
  open: openApp,
  download: download
}
