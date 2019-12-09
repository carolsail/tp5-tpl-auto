import { fixurl, serializeObj, lang } from '../../common/js/util'
import Http from '../../common/js/http'
import Form from '../../common/js/form'
import Modal from '../../common/js/modal'
import Table from '../../common/js/table'

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

export function table() {
	// 初始化表格参数配置
	Table.api.init({
		extend: {
				index_url: 'category/index',
				add_url: 'category/add',
				edit_url: 'category/edit',
				del_url: 'category/del',
				multi_url: 'category/multi',
				dragsort_url: 'ajax/weigh',
				table: 'category',
		}
	});

	var table = $("#table");
	var tableOptions = {
			url: $.fn.bootstrapTable.defaults.extend.index_url,
			escape: false,
			pk: 'id',
			sortName: 'weigh',
			pagination: false,
			commonSearch: false,
			search: false,
			columns: [
					[
							{checkbox: true},
							{field: 'id', title: lang('Id')},
							{field: 'type', title: lang('Type'), operate: false, searchList: Config.searchList, formatter: Table.api.formatter.normal},
							{field: 'name', title: lang('Name'), align: 'left'},
							{field: 'nickname', title: lang('Nickname')},
							{field: 'flag', title: lang('Flag'), formatter: Table.api.formatter.flag},
							{field: 'image', title: lang('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
							{field: 'weigh', title: lang('Weigh')},
							{field: 'status', title: lang('Status'), operate: false, formatter: Table.api.formatter.status},
							{field: 'operate', title: lang('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
					]
			]
	};
	// 初始化表格
	table.bootstrapTable(tableOptions);

	// 为表格绑定事件
	Table.api.bindevent(table);
}