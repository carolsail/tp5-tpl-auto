try {
  window.$ = window.jQuery = require('jquery');
  require('bootstrap-sass');
  require('jquery-slimscroll');
  require('fastclick');
  require('admin-lte');
  // 扩展
  window._ = require('lodash');
  window.Layer = require('layerui');
  window.Toastr = require('toastr');
  require('moment');
  require('bootstrap-table');
  require('art-template/lib/template-web');
  require('nice-validator');
  require('nice-validator/dist/local/en');
  require('plupload');
  require('select2');
  require('bootstrap-datepicker');
  require('bootstrap-daterangepicker');
  require('eonasdan-bootstrap-datetimepicker');
  require('dragsort');
  require('summernote');
  require('jstree');
  require('icheck');
  require('cxselect');
  require('../../common/libs/table/table-search');
  require('../../common/libs/table/table-template');
  require('../../common/libs/table/table-export');
  require('../../common/libs/addtabs/jquery.addtabs');
  require('../../common/libs/selectpage/selectpage');
} catch (e) {}


// 全局配置项
$(function(){
  // toastr
  Toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  // jstree
  $.jstree.core.prototype.get_all_checked = function (full) {
    var obj = this.get_selected(), i, j;
    for (i = 0, j = obj.length; i < j; i++) {
        obj = obj.concat(this.get_node(obj[i]).parents);
    }
    obj = $.grep(obj, function (v, i, a) {
        return v != '#';
    });
    obj = obj.filter(function (itm, i, a) {
        return i == a.indexOf(itm);
    });
    return full ? $.map(obj, $.proxy(function (i) {
        return this.get_node(i);
    }, this)) : obj;
  }
})