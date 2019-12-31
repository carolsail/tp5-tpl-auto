import Table from '@common/table'
import {fixurl, lang as __} from '@common/util'

export function index() {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('example/customsearch/index'),
          add_url: '',
          edit_url: '',
          del_url: fixurl('example/customsearch/del'),
          multi_url: '',
          table: '',
      }
  });

  var table = $("#table");

  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      pk: 'id',
      sortName: 'id',
      searchFormVisible: true,
      searchFormTemplate: 'customformtpl',
      columns: [
          [
              {checkbox: true},
              {field: 'id', title: 'ID', operate: false},
              {field: 'admin_id', title: __('Admin_id'), visible: false, operate: false},
              {field: 'username', title: __('Username'), formatter: Table.api.formatter.search},
              {field: 'title', title: __('Title')},
              {field: 'url', title: __('Url'), align: 'left'},
              {field: 'ip', title: __('IP')},
              {field: 'create_time', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {
                  field: 'operate',
                  title: __('Operate'),
                  table: table,
                  events: Table.api.events.operate,
                  formatter: Table.api.formatter.operate
              }
          ]
      ]
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
}