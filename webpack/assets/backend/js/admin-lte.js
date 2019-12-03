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
  require('layerui');
  require('toastr');
  require('bootstrap-table');
  require('art-template/lib/template-web');
  require('parsleyjs');
  require('plupload');
  require('select2');
  require('bootstrap-daterangepicker');

} catch (e) {}

$(document).ready(function() {
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue'
  });

  $('.js-datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  })
});
