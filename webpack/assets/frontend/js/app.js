window.Layer = layer

// 动态按需引入js并调用action
const I = require('./' + Config.controller_name)
I[Config.action_name] != undefined && I[Config.action_name]()
