window._ = require('lodash');

try {
  window.$ = window.jQuery = require('jquery');

  require('bootstrap-sass');

  require('jquery-slimscroll');

  require('fastclick');

  require('icheck');

  // bootstrap-datepicker
  require('bootstrap-datepicker');

  require('admin-lte');

  // 扩展
  window.Layer = require('layerui');
  window.Toastr = require('toastr');
  require('moment');
  require('bootstrap-table');
  require('art-template/lib/template-web');
  require('nice-validator');
  require('nice-validator/dist/local/en');
  require('plupload');
  require('select2');
  require('bootstrap-daterangepicker');
  require('eonasdan-bootstrap-datetimepicker');
  require('dragsort');
  require('cxselect');
  require('summernote');
  require('../../common/libs/table/table-search');
  require('../../common/libs/table/table-template');
  require('../../common/libs/table/table-export');
  require('jstree');
  require('../../common/libs/addtabs/jquery.addtabs');
} catch (e) {}


// 全局配置项
import {fixurl, lang as __} from '../../common/js/util';
$(function(){
  // 设置Toastr
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

  // 清除缓存
  if($('.wipecache').length){
    $('.wipecache').click(function(){
      Layer.confirm(__('Are you sure'), function(index){
        $.ajax({
            url: fixurl('ajax/wipecache'),
            dataType: 'json',
            cache: false,
            success: function (ret) {
                if (ret.hasOwnProperty("code")) {
                    var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                    if (ret.code === 1) {
                        Toastr.success(msg ? msg : __('Wipe cache completed'));
                    } else {
                        Toastr.error(msg ? msg : __('Wipe cache failed'));
                    }
                } else {
                    Toastr.error(__('Unknown data format'));
                }
                Layer.close(index)
            }, error: function () {
                Toastr.error(__('Network error'));
                Layer.close(index)
            }
        })
      })
    })
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