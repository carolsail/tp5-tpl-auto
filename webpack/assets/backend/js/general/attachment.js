import Table from '@common/table'
import Form from '@common/form'
import Upload from '@common/upload'
import {fixurl, lang, query} from '@common/util'

const api = {
  bindevent: function () {
    Form.api.bindevent($("form[role=form]"));
  },
  formatter: {
      thumb: function (value, row, index) {
          if (row.mimetype.indexOf("image") > -1) {
              var style = row.storage == 'upyun' ? '!/fwfh/120x90' : '';
              return '<a href="' + row.fullurl + '" target="_blank"><img src="' + row.fullurl + style + '" alt="" style="max-height:90px;max-width:120px"></a>';
          } else {
              return '<a href="' + row.fullurl + '" target="_blank"><img src="https://tool.fastadmin.net/icon/' + row.imagetype + '.png" alt=""></a>';
          }
      },
      url: function (value, row, index) {
          return '<a href="' + row.fullurl + '" target="_blank" class="label bg-green">' + value + '</a>';
      },
  }
}

export function index() {
  Table.api.init({
    extend: {
      index_url: fixurl('general/attachment/index'),
      add_url: fixurl('general/attachment/add'),
      edit_url: fixurl('general/attachment/edit'),
      del_url: fixurl('general/attachment/del'),
      multi_url: fixurl('general/attachment/multi'),
      table: 'attachment',
    }
  })

  var table = $('#table')
  // 初始化表格
  table.bootstrapTable({
    url: $.fn.bootstrapTable.defaults.extend.index_url,
    sortName: 'id',
    columns: [
        [
            {field: 'state', checkbox: true},
            {field: 'id', title: lang('Id'), operate: false},
            {field: 'url', title: lang('Preview'), formatter: api.formatter.thumb, operate: false},
            // {field: 'url', title: lang('Url'), formatter: api.formatter.url},
            {field: 'imagewidth', title: lang('Imagewidth'), sortable: true},
            {field: 'imageheight', title: lang('Imageheight'), sortable: true},
            {field: 'imagetype', title: lang('Imagetype'), formatter: Table.api.formatter.search},
            // {field: 'storage', title: lang('Storage'), formatter: Table.api.formatter.search},
            {field: 'filesize', title: lang('Filesize'), operate: 'BETWEEN', sortable: true},
            {field: 'mimetype', title: lang('Mimetype'), formatter: Table.api.formatter.search, operate: false},
            {
                field: 'create_time',
                title: lang('Createtime'),
                formatter: Table.api.formatter.datetime,
                operate: 'RANGE',
                addclass: 'datetimerange',
                sortable: true
            },
            {
                field: 'operate',
                title: lang('Operate'),
                table: table,
                events: Table.api.events.operate,
                formatter: Table.api.formatter.operate
            }
        ]
    ],
  });
  // 为表格绑定事件
  Table.api.bindevent(table);
}

export function select () {
  // 初始化表格参数配置
  Table.api.init({
      extend: {
          index_url: fixurl('general/attachment/select'),
      }
  });
  var table = $("#table");
  // 初始化表格
  table.bootstrapTable({
      url: $.fn.bootstrapTable.defaults.extend.index_url,
      sortName: 'id',
      showToggle: false,
      showExport: false,
      columns: [
          [
              {field: 'state', checkbox: true,},
              {field: 'id', title: lang('Id')},
              {field: 'admin_id', title: lang('Admin_id'), visible: false},
              {field: 'user_id', title: lang('User_id'), visible: false},
              {field: 'url', title: lang('Preview'), formatter: api.formatter.thumb, operate: false},
              {field: 'imagewidth', title: lang('Imagewidth'), operate: false},
              {field: 'imageheight', title: lang('Imageheight'), operate: false},
              {
                  field: 'mimetype', title: lang('Mimetype'), operate: 'LIKE %...%',
                  process: function (value, arg) {
                      return value.replace(/\*/g, '%');
                  }
              },
              {field: 'createtime', title: lang('Createtime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', sortable: true},
              {
                  field: 'operate', title: lang('Operate'), events: {
                      'click .btn-chooseone': function (e, value, row, index) {
                          var multiple = query('multiple');
                          multiple = multiple == 'true' ? true : false;
                          ModalLayer.close({url: row.url, multiple: multiple});
                      },
                  }, formatter: function () {
                      return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + lang('Choose') + '</a>';
                  }
              }
          ]
      ]
  });

  // 选中多个
  $(document).on("click", ".btn-choose-multi", function () {
      var urlArr = new Array();
      $.each(table.bootstrapTable("getAllSelections"), function (i, j) {
          urlArr.push(j.url);
      });
      var multiple = query('multiple');
      multiple = multiple == 'true' ? true : false;
      ModalLayer.close({url: urlArr.join(","), multiple: multiple});
  });

  // 为表格绑定事件
  Table.api.bindevent(table);
  Upload.api.plupload($("#toolbar .plupload"), function () {
      $(".btn-refresh").trigger("click");
  });
}

export function add() {
  api.bindevent()
}

export function edit() {
  api.bindevent()
}