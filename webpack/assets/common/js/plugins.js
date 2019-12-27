/**
 * https://bootstrap-datepicker.readthedocs.io/en/latest/
 * @param {*} element 
 * @param {*} options 
 */
function datepicker(element, options){
  options = $.extend({
    todayHighlight: !0,
    autoclose: !0,
    format: 'yyyy-mm-dd'
  }, options)
  $(element).datepicker(options)
}

/**
 * https://sensortower.github.io/daterangepicker/docs [moment.js]
 * @param {*} element 
 * @param {*} options 
 */
function daterangepicker(element, options){
  var options = $.extend({
      timePicker: false,
      autoUpdateInput: false,
      timePickerSeconds: true,
      timePicker24Hour: true,
      autoApply: true,
      locale: {
          format: 'YYYY-MM-DD HH:mm:ss',
          customRangeLabel: "Custom Range",
          applyLabel: "Apply",
          cancelLabel: "Clear",
      },
      ranges: {
        'Today': [moment().startOf('day'), moment().endOf('day')],
        'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
        'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, options)

  var origincallback = function (start, end) {
      $(this.element).val(start.format(this.locale.format) + " - " + end.format(this.locale.format));
      $(this.element).trigger('blur');
  }

  $(element).each(function () {
      var callback = typeof $(this).data('callback') == 'function' ? $(this).data('callback') : origincallback;
      $(this).on('apply.daterangepicker', function (ev, picker) {
          callback.call(picker, picker.startDate, picker.endDate);
      });
      $(this).on('cancel.daterangepicker', function (ev, picker) {
          $(this).val('').trigger('blur');
      });
      $(this).daterangepicker($.extend({}, options, $(this).data()), callback);
  })
}

/**
 * http://eonasdan.github.io/bootstrap-datetimepicker/
 * @param {*} element 
 * @param {*} options 
 */
function datetimepicker(element, options){
    options = $.extend({
        format: 'YYYY-MM-DD HH:mm:ss',
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-history',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        },
        showTodayButton: true,
        showClose: true
    }, options)
    $(element).parent().css('position', 'relative')
    $(element).datetimepicker(options)
}

/**
 * https://select2.org/
 * @param {*} element 
 * @param {*} options 
 */
function select2(element, options){
  options = $.extend({ width: '100%' }, options)
  $(element).select2(options).closest("form").on("reset",function(ev){
      //解决表单reset清空问题
      var targetJQForm = $(ev.target)
      setTimeout((function(){
          this.find("select").trigger("change")
      }).bind(targetJQForm),0)
  })
}

/**
 * https://select2.org/
 * @param {*} element 
 * @param {*} options 
 * @param options.url string 請求服務器
 * @param options.inputLength string 限制字符數才進行服務器請求
 * @param options.data string 携带查询参数
 * @param options.process string 返回服务器数据封装的对象名称
 * @param options.result string 查询框中待显示出来的字段
 * @param options.selection string 显示框中待显示出来的字段
 * @param options.where string 搜索条件
 * @param options.cb_data function 重新組合請求服務器的參數
 * @param options.cb_process function
 * @param options.cb_result function
 * @param options.cb_selection function
 * @param options.cb_selected function
 *  
 */
function select2ajax(element, options){
    options = $.extend({ width: '100%',  dataType: 'json', delay: 250, cache: false, pageLimit: 10 }, options)
    $(element).select2({
        ajax: {
            url: options.url,
            dataType: options.dataType,
            delay: options.delay,
            data: function (params){
                if(typeof options.cb_data === 'function'){
                    return options['cb_data'](params)
                }
                return { q: params.term, page: params.page, limit: options.pageLimit, where: options.where }
            },
            processResults: function (data, params) {
                if(typeof options.cb_process === 'function'){
                    return options['cb_process'](data, params)
                }
                params.page = params.page || 1
                return {
                    results: options.process ? data[options.process] : data.rows,
                    pagination: {
                        more: (params.page * options.pageLimit) < data.total
                    }
                }
            },
            cache: options.cache
        },
        minimumInputLength: options.inputLength || 0,
        placeholder: options.placeholder || '',
        width: options.width,
        escapeMarkup: function (markup) { return markup },
        templateResult: function(repo){
            if (repo.loading) {
                return repo.text;
            }  
            if(typeof options.cb_result === 'function'){
                return options['cb_result'](repo)
            }
            return options.result ? repo[options.result] : ''
        },
        templateSelection: function(repo){
            console.log(repo)
            if(typeof options.cb_selection === 'function'){
                return options['cb_selection'](repo)
            }
            return options.selection && repo[options.selection] ? repo[options.selection] : repo.text
        }
    }).on('select2:select', function(e){
        // 填充數據回調
        if(typeof options.cb_selected === 'function'){
            return options['cb_selected'](e)
        }
    }).closest("form").on("reset",function(ev){
        // 解决表单reset清空问题
        var targetJQForm = $(ev.target)
        setTimeout((function(){
            this.find("select").trigger("change")
        }).bind(targetJQForm),0)
    })
}

function dragsort(element){
  $(element).dragsort({
      dragSelector: "li",
      dragEnd: function(){
          $(element).trigger('change')
      }
  })

  $(element).change(function(){
      const that = $(this)
      const idArr = [];
      that.find('li').each(function(k,v){
          idArr.push($(this).data("id"))
      })
      that.parent().find('input').val(idArr.join(","))
  })
}

export {datepicker, daterangepicker, datetimepicker, select2ajax, select2, kindeditor, dragsort}