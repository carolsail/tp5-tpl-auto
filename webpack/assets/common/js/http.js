const Http = {
  // 请求成功的回调
  onAjaxSuccess(ret, onAjaxSuccess) {
    var data = typeof ret.data !== 'undefined' ? ret.data : null
    var msg = typeof ret.msg !== 'undefined' && ret.msg ? ret.msg : 'Operation completed'
    if (typeof onAjaxSuccess === 'function') {
      var result = onAjaxSuccess.call(this, data, ret)
      if (result === false)
          return
    }
    Toastr.success(msg)
  },
  // 请求错误的回调
  onAjaxError(ret, onAjaxError) {
    var data = typeof ret.data !== 'undefined' ? ret.data : null
    if (typeof onAjaxError === 'function') {
        var result = onAjaxError.call(this, data, ret)
        if (result === false) {
            return
        }
    }
    Toastr.error(ret.msg)
  },
  // 服务器响应数据后
  onAjaxResponse(response) {
    try {
      var ret = typeof response === 'object' ? response : JSON.parse(response)
      if (!ret.hasOwnProperty('code')) {
          $.extend(ret, {code: -2, msg: response, data: null})
      }
    } catch (e) {
      var ret = {code: -1, msg: e.message, data: null}
    }
    return ret
  },
  /**
   * 
   * @param {object | string} options 
   * @param {function} success 
   * @param {function} error 
   * 如果dataType:json時候,會判斷響應中是否code為1,進而調用成功響應,否反調用失敗響應
   * dataType為其他的時候直接返回
   */
  ajax(options, success, error) {
    options = typeof options === 'string' ? {url: options} : options
    var index
    if (typeof options.loading === 'undefined' || options.loading) {
        index = Layer.load(options.loading || 0)
    }
    options = $.extend({
      type: "POST",
      dataType: "json",
      success(ret) {
        index && Layer.close(index)
        // dataType不为json的时候直接返回
        if (options.dataType === 'html' || options.dataType === 'text') {
          success && success.call(this, ret)
          return
        }
        ret = Http.onAjaxResponse(ret)
        if (ret.code === 1) {
          Http.onAjaxSuccess(ret, success)
        } else {
          Http.onAjaxError(ret, error)
        }
      },
      error(xhr) {
        index && Layer.close(index)
        var ret = {code: xhr.status, msg: xhr.statusText, data: null}
        Http.onAjaxError(ret, error)
      }
    }, options)
    return $.ajax(options)
  },
  /** 
   * 采用promise
   */
  ajaxPromise(url){
    return new Promise((resolve, reject)=>{
      $.ajax({
        url: url,
        success(response) {
          resolve(response)
        },
        error(err) {
          reject(err)
        }
      })
    })
  }
}

export default Http