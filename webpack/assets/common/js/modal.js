import Http from './http'
import Form from './form'
import { fixurl } from './util'

const Modal = {
  open(url, title, options) {
    title = title ? title : ""
    url = fixurl(url)
    const opts = {
      type: 'GET',
      dataType: 'html',
      url: url
    }
    Http.ajax(opts, function(html){
      if(!$("#modal-layer").length)
        $('body').append("<div id='modal-layer'>"+html+"</div>")
      $('#modal-layer').html(html)

      var modal = $("#modal-layer .modal")
      var form = $("#modal-layer form")
      modal.modal()
      modal.off('shown.bs.modal').on('shown.bs.modal', function(){
        //form.parsley()
        // 默認焦點focus
				if(form.find('input:first-child').length){
					form.find('input:first-child')[0].focus()
					//form.find('input:first-child')[0].select()
				}
      })
      Form.api.bindevent(form)
    })
  }
}

export default Modal