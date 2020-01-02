import Table from '@common/table'
import {fixurl, lang as __} from '@common/util'

export function index() {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('example/colorbadge/index'),
          add_url: '',
          edit_url: '',
          del_url: fixurl('example/colorbadge/del'),
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
              {field: 'title', title: __('Title')},
              {field: 'ip', title: __('IP')},
              {field: 'createtime', title: __('Create time'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
          ]
      ],
      onLoadSuccess: function (data) {
          // 在表格第次加载成功后,刷新左侧菜单栏彩色小角标,支持一次渲染多个
          // 如果需要在进入后台即显示左侧的彩色小角标,请使用服务端渲染方式,详情修改application/admin/controller/Index.php
          Backend.api.sidebar({
              'example/colorbadge': data.total
          });
          Toastr.info("左侧角标已经刷新成功");
      }
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
}