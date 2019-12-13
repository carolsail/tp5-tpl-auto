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
  require('moment');
  require('toastr');
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
  require('../../common/js/table-search');
  require('../../common/js/table-template');
  require('../../common/js/table-export');
} catch (e) {}
