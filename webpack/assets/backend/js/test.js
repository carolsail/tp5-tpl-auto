import { fixurl, serializeObj } from '../../common/js/util'
import Http from '../../common/js/http'
import Form from '../../common/js/form'
import Modal from '../../common/js/modal'

export function index(){
	//console.log(Config)
	//console.log(Template.render($("#tpl-state").html(), {type: 2}))
	//layer.alert('内容123')
	//toastr.error('Are you the 6 fingered man?')
	// var table = $('#table')
	// table.bootstrapTable({
	// 	columns: [
	// 		[
	// 			{checkbox: true},
	// 			{field: 'create_time', title: '創建時間', sortable: true}
	// 		]
	// 	]
	// })
	//console.log(new plupload.Uploader())
	//$('.datepicker').daterangepicker();
}

export function ajax() {
	$('.action-ajax').click(function(){
		var options = {
			url: fixurl('test/ajax'),
			data: {type: $(this).data('type')}
		}
		Http.ajax(options)
	})
}

export function form() {
	Form.api.bindevent($("form[role=form]"))
}

export function modal() {
	$('.modal-open').click(function(){
		const options = {
			refresh: false
		}
		Modal.open('test/modal', options)
	})

	$(document).on('click', '.btn-modal-twice', function(){
		var that = $(this)
		that.attr('disabled', true)
		var ops = {
			hide(){
				console.log('hide')
				that.removeAttr('disabled')
			},
			show(){
				console.log('show')
			},
			callback(form){
				serializeObj(form)
			}
		}
		Modal.open('test/modal', ops)
	})
}
