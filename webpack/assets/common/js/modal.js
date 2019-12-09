import Http from './http'
import Form from './form'
import { fixurl } from './util'

const Modal = {
  /**
   * @param fun  options.callback 提交成功后回調
   * @param fun  options.show modal打開后回調
   * @param fun  options.hide modal關閉后回調
   * @param bool options.refresh 是否刷新bootstrap-table
   */
  open(url, options) {
    url = fixurl(url)
    const opts = {
      type: 'GET',
      dataType: 'html',
      url: url
    }
    Http.ajax(opts, function(html){
      if(!$("#modal-layer").length)
        $('body').append("<div id='modal-layer'></div>")
      $('#modal-layer').append("<div class='modal-item'>"+html+"</div>")
      var item = $("#modal-layer .modal-item:last")
      if(item.length){
        var modal = item.find('.modal')
        var form = item.find('form')
        modal.modal({backdrop: false})
        modal.off('shown.bs.modal').on('shown.bs.modal', function (e) {
          if(options.show && typeof options.show === 'function'){
            options['show'](e);
          }
          // 焦點focus
          if(form.find('input.focus').length===1){
            form.find('input.focus').focus()
          }
        })
        modal.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
          if(options.hide && typeof options.hide === 'function'){
            options['hide'](e);
          }
          item.remove()
        })
        Form.api.bindevent(form, function(data, ret){
          // 刷新bootstrap-table
          if (typeof options.refresh === 'undefined' || options.refresh) {
            console.log('refresh bootstrap table')
            //$(".btn-refresh").trigger("click")
          }
          //表單提交成功后執行
          if(options.callback && typeof options.callback === 'function'){
            return options['callback'](form, data, ret);
          }
        })
      }
    })
  }
}

export default Modal