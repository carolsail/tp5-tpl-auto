import Http from './http'
import Upload from './upload'
import {select2, datepicker, daterangepicker} from './plugins'

const Form = {
    config: {
        fieldlisttpl: '<dd class="form-inline"><input type="text" name="<%=name%>[<%=index%>][key]" class="form-control" value="<%=row.key%>" size="10" /> <input type="text" name="<%=name%>[<%=index%>][value]" class="form-control" value="<%=row.value%>" /> <span class="btn btn-sm btn-danger btn-remove"><i class="fa fa-times"></i></span> <span class="btn btn-sm btn-primary btn-dragsort"><i class="fa fa-arrows"></i></span></dd>'
    },
    events: {
        validator: function (form, success, error, submit) {
            if (!form.is("form"))
                return
            // 表单parsley验证初始化    
            form.parsley()
            var submitBtn = $("[type=submit]", form)
            var resetBtn = $("[type=reset]", form)

            // 绑定表单事件
            form.on('submit', function(e){
                e.preventDefault()
                var that = $(this)
                if (that.parsley().isValid()) {
                    submitBtn.attr('disabled', true)
                    resetBtn.attr('disabled', true)
                    var submitResult =  Form.api.submit($(this), function (data, ret) {
                        if (false === $(this).triggerHandler("success.form", [data, ret])) {
                            return false
                        }
                        if (typeof success === 'function') {
                            if (false === success.call($(this), data, ret)) {
                                return false
                            }
                        }
                        // 提示信息
                        var msg = ret.hasOwnProperty("msg") && ret.msg !== "" ? ret.msg : 'Operation completed'
                        // 关闭modal或重定向：情况根据表单是否为modal形式而定
                        if (that.closest('.modal-item').find('.modal').length) {
                            Toastr.success(msg)
                            submitBtn.removeAttr("disabled")
                            resetBtn.removeAttr("disabled")
                            that.closest('.modal-item').find('.modal').modal('hide')
                            // $(".btn-refresh").trigger("click")
                        } else {
                          Layer.msg(msg, {icon: 6, time: 1000}, function(){
                            location.href = ret.url
                          })
                        }
                        return false
                    }, function (data, ret) {
                        if (false === $(this).triggerHandler("error.form", [data, ret])) {
                            return false
                        }
                        submitBtn.removeAttr("disabled")
                        resetBtn.removeAttr("disabled")
                        if (typeof error === 'function') {
                            if (false === error.call($(this), data, ret)) {
                                return false
                            }
                        }
                    }, submit)
                    //如果提交失败则释放锁定
                    if (!submitResult) {
                        submitBtn.removeAttr("disabled")
                        resetBtn.removeAttr("disabled")
                    }
                }
            })

            submitBtn.removeAttr('disabled')
            resetBtn.removeAttr('disabled')
        },
        select2: function(form) {
            if($(".select2", form).length) {
                select2($(".select2", form))
            }
        },
        datepicker: function(form) {
            if($(".datepicker", form).length) {
                datepicker($(".datepicker", form))
            }
        },
        daterangepicker: function(form) {
            if($(".datetimerange", form).length) {
                daterangepicker($(".datetimerange", form))
            }
        },
        plupload: function (form) {
            if ($(".plupload", form).length) {
                Upload.api.plupload($(".plupload", form))
            }
        },
        // cxselect: function (form) {
        //     //绑定cxselect元素事件
        //     if ($("[data-toggle='cxselect']", form).size() > 0) {
        //         require(['cxselect'], function () {
        //             $.cxSelect.defaults.jsonName = 'name';
        //             $.cxSelect.defaults.jsonValue = 'value';
        //             $.cxSelect.defaults.jsonSpace = 'data';
        //             $("[data-toggle='cxselect']", form).cxSelect();
        //         });
        //     }
        // },
        // datetimepicker: function (form) {
        //     //绑定日期时间元素事件
        //     if ($(".datetimepicker", form).size() > 0) {
        //         require(['bootstrap-datetimepicker'], function () {
        //             var options = {
        //                 format: 'YYYY-MM-DD HH:mm:ss',
        //                 icons: {
        //                     time: 'fa fa-clock-o',
        //                     date: 'fa fa-calendar',
        //                     up: 'fa fa-chevron-up',
        //                     down: 'fa fa-chevron-down',
        //                     previous: 'fa fa-chevron-left',
        //                     next: 'fa fa-chevron-right',
        //                     today: 'fa fa-history',
        //                     clear: 'fa fa-trash',
        //                     close: 'fa fa-remove'
        //                 },
        //                 showTodayButton: true,
        //                 showClose: true
        //             };
        //             $('.datetimepicker', form).parent().css('position', 'relative');
        //             $('.datetimepicker', form).datetimepicker(options);
        //         });
        //     }
        // },
        // faselect: function (form) {
        //     //绑定fachoose选择附件事件
        //     if ($(".fachoose", form).size() > 0) {
        //         $(".fachoose", form).on('click', function () {
        //             var that = this;
        //             var multiple = $(this).data("multiple") ? $(this).data("multiple") : false;
        //             var mimetype = $(this).data("mimetype") ? $(this).data("mimetype") : '';
        //             var admin_id = $(this).data("admin-id") ? $(this).data("admin-id") : '';
        //             var user_id = $(this).data("user-id") ? $(this).data("user-id") : '';
        //             parent.Fast.api.open("general/attachment/select?element_id=" + $(this).attr("id") + "&multiple=" + multiple + "&mimetype=" + mimetype + "&admin_id=" + admin_id + "&user_id=" + user_id, __('Choose'), {
        //                 callback: function (data) {
        //                     var button = $("#" + $(that).attr("id"));
        //                     var maxcount = $(button).data("maxcount");
        //                     var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
        //                     maxcount = typeof maxcount !== "undefined" ? maxcount : 0;
        //                     if (input_id && data.multiple) {
        //                         var urlArr = [];
        //                         var inputObj = $("#" + input_id);
        //                         var value = $.trim(inputObj.val());
        //                         if (value !== "") {
        //                             urlArr.push(inputObj.val());
        //                         }
        //                         urlArr.push(data.url)
        //                         var result = urlArr.join(",");
        //                         if (maxcount > 0) {
        //                             var nums = value === '' ? 0 : value.split(/\,/).length;
        //                             var files = data.url !== "" ? data.url.split(/\,/) : [];
        //                             var remains = maxcount - nums;
        //                             if (files.length > remains) {
        //                                 Toastr.error(__('You can choose up to %d file%s', remains));
        //                                 return false;
        //                             }
        //                         }
        //                         inputObj.val(result).trigger("change").trigger("validate");
        //                     } else {
        //                         $("#" + input_id).val(data.url).trigger("change").trigger("validate");
        //                     }
        //                 }
        //             });
        //             return false;
        //         });
        //     }
        // },
        // fieldlist: function (form) {
        //     //绑定fieldlist
        //     if ($(".fieldlist", form).size() > 0) {
        //         require(['dragsort', 'template'], function (undefined, Template) {
        //             //刷新隐藏textarea的值
        //             var refresh = function (name) {
        //                 var data = {};
        //                 var textarea = $("textarea[name='" + name + "']", form);
        //                 var container = textarea.closest("dl");
        //                 var template = container.data("template");
        //                 $.each($("input,select,textarea", container).serializeArray(), function (i, j) {
        //                     var reg = /\[(\w+)\]\[(\w+)\]$/g;
        //                     var match = reg.exec(j.name);
        //                     if (!match)
        //                         return true;
        //                     match[1] = "x" + parseInt(match[1]);
        //                     if (typeof data[match[1]] == 'undefined') {
        //                         data[match[1]] = {};
        //                     }
        //                     data[match[1]][match[2]] = j.value;
        //                 });
        //                 var result = template ? [] : {};
        //                 $.each(data, function (i, j) {
        //                     if (j) {
        //                         if (!template) {
        //                             if (j.key != '') {
        //                                 result[j.key] = j.value;
        //                             }
        //                         } else {
        //                             result.push(j);
        //                         }
        //                     }
        //                 });
        //                 textarea.val(JSON.stringify(result));
        //             };
        //             //监听文本框改变事件
        //             $(document).on('change keyup', ".fieldlist input,.fieldlist textarea,.fieldlist select", function () {
        //                 refresh($(this).closest("dl").data("name"));
        //             });
        //             //追加控制
        //             $(".fieldlist", form).on("click", ".btn-append,.append", function (e, row) {
        //                 var container = $(this).closest("dl");
        //                 var index = container.data("index");
        //                 var name = container.data("name");
        //                 var template = container.data("template");
        //                 var data = container.data();
        //                 index = index ? parseInt(index) : 0;
        //                 container.data("index", index + 1);
        //                 var row = row ? row : {};
        //                 var vars = {index: index, name: name, data: data, row: row};
        //                 var html = template ? Template(template, vars) : Template.render(Form.config.fieldlisttpl, vars);
        //                 $(html).insertBefore($(this).closest("dd"));
        //                 $(this).trigger("fa.event.appendfieldlist", $(this).closest("dd").prev());
        //             });
        //             //移除控制
        //             $(".fieldlist", form).on("click", "dd .btn-remove", function () {
        //                 var container = $(this).closest("dl");
        //                 $(this).closest("dd").remove();
        //                 refresh(container.data("name"));
        //             });
        //             //拖拽排序
        //             $("dl.fieldlist", form).dragsort({
        //                 itemSelector: 'dd',
        //                 dragSelector: ".btn-dragsort",
        //                 dragEnd: function () {
        //                     refresh($(this).closest("dl").data("name"));
        //                 },
        //                 placeHolderTemplate: "<dd></dd>"
        //             });
        //             //渲染数据
        //             $(".fieldlist", form).each(function () {
        //                 var container = this;
        //                 var textarea = $("textarea[name='" + $(this).data("name") + "']", form);
        //                 if (textarea.val() == '') {
        //                     return true;
        //                 }
        //                 var template = $(this).data("template");
        //                 var json = {};
        //                 try {
        //                     json = JSON.parse(textarea.val());
        //                 } catch (e) {
        //                 }
        //                 $.each(json, function (i, j) {
        //                     $(".btn-append,.append", container).trigger('click', template ? j : {
        //                         key: i,
        //                         value: j
        //                     });
        //                 });
        //             });
        //         });
        //     }
        // },
        // switcher: function (form) {
        //     form.on("click", "[data-toggle='switcher']", function () {
        //         if ($(this).hasClass("disabled")) {
        //             return false;
        //         }
        //         var input = $(this).prev("input");
        //         input = $(this).data("input-id") ? $("#" + $(this).data("input-id")) : input;
        //         if (input.size() > 0) {
        //             var yes = $(this).data("yes");
        //             var no = $(this).data("no");
        //             if (input.val() == yes) {
        //                 input.val(no);
        //                 $("i", this).addClass("fa-flip-horizontal text-gray");
        //             } else {
        //                 input.val(yes);
        //                 $("i", this).removeClass("fa-flip-horizontal text-gray");
        //             }
        //             input.trigger('change');
        //         }
        //         return false;
        //     });
        // },
        // bindevent: function (form) {

        // },
        // slider: function (form) {
        //     if ($(".slider", form).size() > 0) {
        //         require(['bootstrap-slider'], function () {
        //             $('.slider').removeClass('hidden').css('width', function (index, value) {
        //                 return $(this).parents('.form-control').width();
        //             }).slider().on('slide', function (ev) {
        //                 var data = $(this).data();
        //                 if (typeof data.unit !== 'undefined') {
        //                     $(this).parents('.form-control').siblings('.value').text(ev.value + data.unit);
        //                 }
        //             });
        //         });
        //     }
        // }
    },
    api: {
        submit(form, success, error, submit) {
            if (form.length === 0) {
                Toastr.error("表单未初始化完成,无法提交")
                return false
            }
            if (typeof submit === 'function') {
                if (false === submit.call(form, success, error)) {
                    return false
                }
            }
            var type = form.attr("method") ? form.attr("method").toUpperCase() : 'GET'
            type = type && (type === 'GET' || type === 'POST') ? type : 'GET'
            var url = form.attr("action")
            url = url ? url : location.href
            //修复当存在多选项元素时提交的BUG
            var params = {};
            var multipleList = $("[name$='[]']", form)
            if (multipleList.length> 0) {
                var postFields = form.serializeArray().map(function (obj) {
                    return $(obj).prop("name")
                });
                $.each(multipleList, function (i, j) {
                    if (postFields.indexOf($(this).prop("name")) < 0) {
                        params[$(this).prop("name")] = ''
                    }
                })
            }
            //调用Ajax请求方法
            Http.ajax({
                type: type,
                url: url,
                data: form.serialize() + (Object.keys(params).length > 0 ? '&' + $.param(params) : ''),
                dataType: 'json',
                complete: function (xhr) {
                    var token = xhr.getResponseHeader('__token__')
                    if (token) {
                        $("input[name='__token__']").val(token)
                    }
                }
            }, function (data, ret) {
                // $('.form-group', form).removeClass('parsley-success parsley-error')
                if (data && typeof data === 'object') {
                    //刷新客户端token
                    if (typeof data.token !== 'undefined') {
                        $("input[name='__token__']").val(data.token)
                    }
                    //调用客户端事件
                    if (typeof data.callback !== 'undefined' && typeof data.callback === 'function') {
                        data.callback.call(form, data)
                    }
                }
                if (typeof success === 'function') {
                    if (false === success.call(form, data, ret)) {
                        return false
                    }
                }
            }, function (data, ret) {
                if (data && typeof data === 'object' && typeof data.token !== 'undefined') {
                    $("input[name='__token__']").val(data.token)
                }
                if (typeof error === 'function') {
                    if (false === error.call(form, data, ret)) {
                        return false
                    }
                }
            })
            return true
        },
        bindevent: function (form, success, error, submit) {

            form = typeof form === 'object' ? form : $(form)

            var events = Form.events

            events.validator(form, success, error, submit)

            events.select2(form)

            events.datepicker(form)

            events.daterangepicker(form)

            events.plupload(form)

            // events.selectpage(form);

            // events.cxselect(form);

            // events.citypicker(form);

            // events.datetimepicker(form);


            // events.faselect(form);

            // events.fieldlist(form);

            // events.slider(form);

            // events.switcher(form);
        }
    }
}

export default Form