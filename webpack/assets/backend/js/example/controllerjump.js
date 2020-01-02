import Table from '@common/table'
import {fixurl, lang as __} from '@common/util'

const api = {
  formatter: {
    ip(value, row, index) {
        //这里手动构造URL
        var url = fixurl("example/bootstraptable") + "?" + this.field + "=" + value;

        //方式一,直接返回class带有addtabsit的链接,这可以方便自定义显示内容
        return '<a href="' + url + '" class="label label-success addtabsit" title="' + __("Search %s", value) + '">' + __('Search %s', value) + '</a>';

        //方式二,直接调用Table.api.formatter.addtabs
        return Table.api.formatter.addtabs(value, row, index, url);
    }
  }
}

export function index() {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('example/controllerjump/index'),
          add_url: '',
          edit_url: '',
          del_url: fixurl('example/controllerjump/del'),
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
              {field: 'id', title: 'ID'},
              {field: 'admin_id', title: __('Admin_id')},
              {field: 'title', title: __('Title')},
              {field: 'ip', title: __('IP'), formatter: api.formatter.ip},
              {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
          ]
      ]
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
}