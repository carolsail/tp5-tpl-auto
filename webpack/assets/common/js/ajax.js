// 请求成功的回调
function onAjaxSuccess(ret, onAjaxSuccess) {
  var data = typeof ret.data !== 'undefined' ? ret.data : null
  var msg = typeof ret.msg !== 'undefined' && ret.msg ? ret.msg : 'Operation completed'
  if (typeof onAjaxSuccess === 'function') {
    var result = onAjaxSuccess.call(this, data, ret)
    if (result === false)
        return
  }
  Toastr.success(msg)
}

// 请求错误的回调
function onAjaxError(ret, onAjaxError) {
  var data = typeof ret.data !== 'undefined' ? ret.data : null
  if (typeof onAjaxError === 'function') {
      var result = onAjaxError.call(this, data, ret)
      if (result === false) {
          return
      }
  }
  Toastr.error(ret.msg)
}

// 服务器响应数据后
function onAjaxResponse(response) {
  try {
    var ret = typeof response === 'object' ? response : JSON.parse(response)
    if (!ret.hasOwnProperty('code')) {
        $.extend(ret, {code: -2, msg: response, data: null})
    }
  } catch (e) {
    var ret = {code: -1, msg: e.message, data: null}
  }
  return ret
}

// 发送Ajax请求
export function ajax(options, success, error) {
  options = typeof options === 'string' ? {url: options} : options;
  var index = Layer.load()
  options = $.extend({
    type: "POST",
    dataType: "json",
    success(ret) {
      Layer.close(index)
      ret = onAjaxResponse(ret)
      if (ret.code === 1) {
        onAjaxSuccess(ret, success)
      } else {
        onAjaxError(ret)
      }
    },
    error(xhr) {
      Layer.close(index)
      var ret = {code: xhr.status, msg: xhr.statusText, data: null}
      onAjaxError(ret, error)
    }
  }, options)

  $.ajax(options)
}