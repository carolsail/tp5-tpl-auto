import Table from '@common/table'
import {fixurl, lang as __} from '@common/util'

export function index() {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('example/relationmodel/index'),
          add_url: '',
          edit_url: '',
          del_url: fixurl('example/relationmodel/del'),
          multi_url: '',
      }
  });

  var table = $("#table");
  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      columns: [
          [
              {field: 'state', checkbox: true, },
              {field: 'id', title: 'ID', operate: '='},
              {field: 'title', title: __('Title'), operate: 'LIKE %...%', placeholder: '关键字，模糊搜索'},
              {field: 'admin.avatar', title: __('Avatar'), operate: false, formatter: Table.api.formatter.image},
              {field: 'admin.username', title: __('Username'), operate: '='},
              {field: 'admin.nickname', title: __('Nickname'), operate: 'LIKE %...%', placeholder: '关键字，模糊搜索'},
              {field: 'ip', title: __('IP'), operate: '='},
              {field: 'create_time', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
          ]
      ],
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
}