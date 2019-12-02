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
