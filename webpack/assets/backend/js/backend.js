import Tabs from '@common/tabs'

const I = require('./' + Config.controller_name)
I[Config.action_name] != undefined && I[Config.action_name]()

//点击包含.btn-addtabs的元素时新增选项卡
$(document).on('click', '.btn-addtabs, .addtabsit', function (e) {
  var that = this;
  var title = $(that).attr("title") || $(that).data("title") || $(that).data('original-title');
  var url = $(that).attr('href')
  Tabs.addtabs(url, title);
  return false;
})