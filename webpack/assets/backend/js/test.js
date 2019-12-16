import { fixurl, serializeObj, lang } from '../../common/js/util'
import Http from '../../common/js/http'
import Form from '../../common/js/form'
import Modal from '../../common/js/modal'
import ModalLayer from '../../common/js/modal-layer'

const api = {
	events: {
		modal() {
			$('.action-modal-bootstrap').click(function(){
				var that = $(this)
				that.attr('disabled', true)
				var options = {
					refresh: false,
					hide(){
						console.log('hide')
						that.removeAttr('disabled')
					},
					show(){
						console.log('show')
					},
					callback(form){
						console.log('callback')
						serializeObj(form)
					}
				}
				Modal.open('test/modal', options)
			})

			$('.action-modal-layer').click(function(){
				ModalLayer.open('test/modal', lang('layer modal'), $(this).data() || {})
			})
		},
		ajax() {
			$('.action-ajax').click(function(){
				var options = {
					url: fixurl('test/ajax'),
					data: {type: $(this).data('type')}
				}
				Http.ajax(options)
			})
		}
	}
}

export function index() {
	api.events.modal()
	api.events.ajax()
}

export function modal(){
	Form.api.bindevent('.modal-layer-form')
}