import { fixurl } from '../../common/js/util'
import { ajax as http } from '../../common/js/ajax'
import Form from '../../common/js/form'

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
		http(options)
	})
}

export function form() {
	Form.api.bindevent($('form'))
}