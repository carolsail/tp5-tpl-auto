import Table from '../../../common/js/table'
import Form from '../../../common/js/form'
import {lang as __, cdnurl, fixurl} from '../../../common/js/util'

export function index() {

  // 初始化表格参数配置
  Table.api.init({
      search: true,
      advancedSearch: true,
      pagination: true,
      extend: {
          "index_url": fixurl("general/profile/index"),
          "add_url": "",
          "edit_url": "",
          "del_url": "",
          "multi_url": "",
      }
  });

  var table = $("#table");

  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      columns: [
          [
              {field: 'id', title: 'ID'},
              {field: 'title', title: __('Title')},
              {field: 'url', title: __('Url'), align: 'left', formatter: Table.api.formatter.url},
              {field: 'ip', title: __('ip'), formatter:Table.api.formatter.search},
              {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
          ]
      ],
      commonSearch: false
  });

  // 为表格绑定事件
  Table.api.bindevent(table);//当内容渲染完成后

  // 给上传按钮添加上传成功事件
  $("#plupload-avatar").data("upload-success", function (data) {
      var url = cdnurl(data.url);
      $(".profile-user-img").prop("src", url);
      Toastr.success("上传成功！");
  });
  
  // 给表单绑定事件
  Form.api.bindevent($("#update-form"), function () {
      $("input[name='row[password]']").val('');
      var url = cdnurl($("#c-avatar").val());
      top.window.$(".user-panel .image img,.user-menu > a > img,.user-header > img").prop("src", url);
      return true;
  });
}