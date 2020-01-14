import Table from '@common/table'
import Form from '@common/form'
import {fixurl, lang as __} from '@common/util'

const api = {
  bindevent(){
      Form.api.bindevent($("form[role=form]"), null, null, function () {
          if ($("#treeview").length > 0) {
              var r = $("#treeview").jstree("get_all_checked");
              $("input[name='row[rules]']").val(r.join(','));
          }
          return true;
      });
      //渲染权限节点树
      //销毁已有的节点树
      $("#treeview").jstree("destroy");
      api.rendertree(nodeData);
      //全选和展开
      $(document).on("click", "#checkall", function () {
          $("#treeview").jstree($(this).prop("checked") ? "check_all" : "uncheck_all");
      });
      $(document).on("click", "#expandall", function () {
          $("#treeview").jstree($(this).prop("checked") ? "open_all" : "close_all");
      });
      $("select[name='row[pid]']").trigger("change");
  },
  rendertree(content){
      $("#treeview")
      .on('redraw.jstree', function (e) {
          $(".layer-footer").attr("domrefresh", Math.random());
      })
      .jstree({
          "themes": {"stripes": true},
          "checkbox": {
              "keep_selected_style": false,
          },
          "types": {
              "root": {
                  "icon": "fa fa-folder-open",
              },
              "menu": {
                  "icon": "fa fa-folder-open",
              },
              "file": {
                  "icon": "fa fa-file-o",
              }
          },
          "plugins": ["checkbox", "types"],
          "core": {
              'check_callback': true,
              "data": content
          }
      });
  }
}

export function index(){
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('user/group/index'),
          add_url: fixurl('user/group/add'),
          edit_url: fixurl('user/group/edit'),
          del_url: fixurl('user/group/del'),
          multi_url: fixurl('user/group/multi'),
          table: 'user_group',
      }
  });

  var table = $("#table");

  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      pk: 'id',
      sortName: 'id',
      columns: [
          [
              {checkbox: true},
              {field: 'id', title: __('Id')},
              {field: 'name', title: __('Name')},
              {field: 'create_time', title: __('Createtime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {field: 'update_time', title: __('Updatetime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {field: 'status', title: __('Status'), formatter: Table.api.formatter.status},
              {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
          ]
      ]
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
}

export function add(){
  api.bindevent();
}

export function edit(){
  api.bindevent();
}