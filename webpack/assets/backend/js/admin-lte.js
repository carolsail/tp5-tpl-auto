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
  window.Moment = require('moment');
  window.Template = require('art-template/dist/template-native');
  require('bootstrap-table');
  require('nice-validator');
  require('nice-validator/dist/local/en');
  require('plupload');
  require('select2');
  require('bootstrap-datepicker');
  require('bootstrap-daterangepicker');
  require('eonasdan-bootstrap-datetimepicker');
  require('summernote');
  require('jstree');
  require('icheck');
  require('cxselect');
  require('carolsail.selectpage');
  require('../../common/libs/table/table-search');
  require('../../common/libs/table/table-template');
  require('../../common/libs/table/table-export');
  require('../../common/libs/addtabs/jquery.addtabs');
  require('../../common/libs/dragsort/jquery.dragsort');
} catch (e) {}