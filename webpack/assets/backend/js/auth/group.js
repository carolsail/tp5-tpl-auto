
import Table from '../../../common/js/table'
import Form from '../../../common/js/form'
import {lang as __, fixurl} from '../../../common/js/util'

const api = {
  bindevent: function () {
      Form.api.bindevent($("form[role=form]"), null, null, function () {
          if ($("#treeview").length) {
              var r = $("#treeview").jstree("get_all_checked");
              $("input[name='row[rules]']").val(r.join(','));
          }
          return true;
      });
      //渲染权限节点树
      //变更级别后需要重建节点树
      $(document).on("change", "select[name='row[pid]']", function () {
          var pid = $(this).data("pid");
          var id = $(this).data("id");
          if ($(this).val() == id) {
              $("option[value='" + pid + "']", this).prop("selected", true).change();
              toastr.error(__('Can not change the parent to self'));
              return false;
          }
          $.ajax({
              url: fixurl("auth/group/roletree"),
              type: 'post',
              dataType: 'json',
              data: {id: id, pid: $(this).val()},
              success: function (ret) {
                  if (ret.hasOwnProperty("code")) {
                      var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : "";
                      if (ret.code === 1) {
                          //销毁已有的节点树
                          $("#treeview").jstree("destroy");
                          api.rendertree(data);
                      } else {
                          toastr.error(ret.msg);
                      }
                  }
              }, error: function (e) {
                  toastr.error(e.message);
              }
          });
      });
      //全选和展开
      $(document).on("click", "#checkall", function () {
          $("#treeview").jstree($(this).prop("checked") ? "check_all" : "uncheck_all");
      });
      $(document).on("click", "#expandall", function () {
          $("#treeview").jstree($(this).prop("checked") ? "open_all" : "close_all");
      });
      $("select[name='row[pid]']").trigger("change");
  },
  rendertree: function (content) {
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

export function index() {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          "index_url": fixurl("auth/group/index"),
          "add_url": fixurl("auth/group/add"),
          "edit_url": fixurl("auth/group/edit"),
          "del_url": fixurl("auth/group/del"),
          "multi_url": fixurl("auth/group/multi"),
      }
  });

  var table = $("#table");

  //在表格内容渲染完成后回调的事件
  table.on('post-body.bs.table', function (e, json) {
      $("tbody tr[data-index]", this).each(function () {
          if (Config.admin.group_ids.indexOf(parseInt(parseInt($("td:eq(1)", this).text()))) > -1) {
              $("input[type=checkbox]", this).prop("disabled", true);
          }
      });
  });

  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      escape: false,
      columns: [
          [
              {field: 'state', checkbox: true,},
              {field: 'id', title: 'ID'},
              {field: 'pid', title: __('Parent')},
              {field: 'name', title: __('Name'), align: 'left'},
              {field: 'status', title: __('Status'), formatter: Table.api.formatter.status},
              {
                  field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: function (value, row, index) {
                      if (Config.admin.group_ids.indexOf(parseInt(row.id)) > -1) {
                          return '';
                      }
                      return Table.api.formatter.operate.call(this, value, row, index);
                  }
              }
          ]
      ],
      pagination: false,
      search: false,
      commonSearch: false,
  });

  // 为表格绑定事件
  Table.api.bindevent(table);//当内容渲染完成后
}

export function add() {
  api.bindevent();
}

export function edit() {
  api.bindevent();
}