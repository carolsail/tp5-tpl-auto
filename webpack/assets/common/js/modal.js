import Http from './http'
import Form from './form'
import { fixurl } from './util'

const Modal = {
  /**
   * @param fun  options.callback 提交成功后回調
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
      $('#modal-layer').html(html)

      var modal = $("#modal-layer .modal")
      var form = $("#modal-layer form")
      modal.modal()
      modal.off('shown.bs.modal').on('shown.bs.modal', function(){
        // 焦點focus
        if(form.find('input.focus').length===1){
          form.find('input.focus').focus()
        }
      })
      Form.api.bindevent(form, function(data, ret){
        //表單提交成功后執行
        if(options.callback && typeof options.callback === 'function'){
          return options['callback'](form, data, ret);
        }

        if (typeof options.refresh === 'undefined' || options.refresh) {
           console.log('refresh bootstrap table')
           //$(".btn-refresh").trigger("click")
        }
      })
    })
  }
}

export default Modal