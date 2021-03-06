import Http from './http'
import Upload from './upload'
import {cdnurl, lang} from './util'
import {select2, select2ajax, datepicker, daterangepicker, datetimepicker} from './plugins'

const Form = {
    config: {
        fieldlisttpl: '<dd class="form-inline"><input type="text" name="<%=name%>[<%=index%>][key]" class="form-control" value="<%=row.key%>" size="10" /> <input type="text" name="<%=name%>[<%=index%>][value]" class="form-control" value="<%=row.value%>" /> <span class="btn btn-sm btn-danger btn-remove"><i class="fa fa-times"></i></span> <span class="btn btn-sm btn-primary btn-dragsort"><i class="fa fa-arrows"></i></span></dd>'
    },
    events: {
        validator: function (form, success, error, submit) {
            if (!form.is("form"))
                return;
            //绑定表单事件
            var submitBtn = $("[type=submit]", form)
            var resetBtn = $("[type=reset]", form)
            form.validator($.extend({
                validClass: 'has-success',
                invalidClass: 'has-error',
                bindClassTo: '.form-group',
                formClass: 'n-default n-bootstrap',
                msgClass: 'n-right',
                stopOnError: true,
                display: function (elem) {
                    return $(elem).closest('.form-group').find(".control-label").text().replace(/\:/, '');
                },
                dataFilter: function (data) {
                    if (data.code === 1) {
                        return data.msg ? { "ok": data.msg } : '';
                    } else {
                        return data.msg;
                    }
                },
                target: function (input) {
                    var target = $(input).data("target");
                    if (target && $(target).size() > 0) {
                        return $(target);
                    }
                    var $formitem = $(input).closest('.form-group'),
                        $msgbox = $formitem.find('span.msg-box');
                    if (!$msgbox.length) {
                        return [];
                    }
                    return $msgbox;
                },
                valid: function (ret) {
                    var that = this, submitBtn = $(".layer-footer [type=submit]", form);
                    that.holdSubmit(true);
                    submitBtn.attr('disabled', true)
                    resetBtn.attr('disabled', true)
                    //验证通过提交表单
                    var submitResult = Form.api.submit($(ret), function (data, ret) {
                        that.holdSubmit(false);
                        submitBtn.removeAttr('disabled')
                        resetBtn.removeAttr('disabled')
                        if (false === $(this).triggerHandler("success.form", [data, ret])) {
                            return false;
                        }
                        if (typeof success === 'function') {
                            if (false === success.call($(this), data, ret)) {
                                return false;
                            }
                        }

                        var msg = ret.hasOwnProperty("msg") && ret.msg !== "" ? ret.msg : lang('Operation completed');
                        parent.Toastr.success(msg);

                        if (form.closest('.modal-item').find('.modal').length) {
                            //modal提交
                            submitBtn.removeAttr("disabled")
                            resetBtn.removeAttr("disabled")
                            form.closest('.modal-item').find('.modal').modal('hide')
                        } else if (form.find('.layer-footer').length) {
                            //layer提交
                            parent.$(".btn-refresh").trigger("click");
                            var index = parent.Layer.getFrameIndex(window.name);
                            parent.Layer.close(index);
                        } else {
                            //page提交
                            setTimeout(()=>{
                                location.href = ret.url
                            }, 1000)
                        }
                        return false
                    }, function (data, ret) {
                        that.holdSubmit(false);
                        if (false === $(this).triggerHandler("error.form", [data, ret])) {
                            return false;
                        }
                        submitBtn.removeAttr('disabled')
                        resetBtn.removeAttr('disabled')
                        if (typeof error === 'function') {
                            if (false === error.call($(this), data, ret)) {
                                return false;
                            }
                        }
                    }, submit);
                    //如果提交失败则释放锁定
                    if (!submitResult) {
                        that.holdSubmit(false);
                        submitBtn.removeAttr('disabled')
                        resetBtn.removeAttr('disabled')
                    }
                    return false;
                }
            }, form.data("validator-options") || {}));

            //移除按钮的disabled
            submitBtn.removeAttr('disabled')
            resetBtn.removeAttr('disabled')
        },
        select2: function(form) {
            if($(".select2", form).length) {
                select2($(".select2", form))
            }
        },
        select2ajax: function(form) {
            if($(".select2ajax", form).length){
                var _that = $(".select2ajax", form)
                var options = {
                    url: _that.data('url'),
                    process: _that.data('process'),
                    result: _that.data('result'),
                    selection: _that.data('selection'),
                    where: _that.data('where'),
                    pageLimit: 8
                }
                select2ajax($(".select2ajax", form), options)
            }
        },
        selectpage: function(form) {
            if ($(".selectpage", form).length) {
                $('.selectpage', form).selectPage({
                    eAjaxSuccess: function (data) {
                        data.list = typeof data.rows !== 'undefined' ? data.rows : (typeof data.list !== 'undefined' ? data.list : []);
                        data.totalRow = typeof data.total !== 'undefined' ? data.total : (typeof data.totalRow !== 'undefined' ? data.totalRow : data.list.length);
                        return data;
                    }
                });
                //给隐藏的元素添加上validate验证触发事件
                $(document).on("change", ".sp_hidden", function () {
                    $(this).trigger("validate");
                });
                $(document).on("change", ".sp_input", function () {
                    $(this).closest(".sp_container").find(".sp_hidden").trigger("change");
                });
                $(form).on("reset", function () {
                    setTimeout(function () {
                        $('.selectpage', form).selectPageClear();
                    }, 1);
                });
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
        datetimepicker: function (form) {
            if ($(".datetimepicker", form).length) {
                datetimepicker($(".datetimepicker", form))
            }
        },
        icheck: function(form) {
            if ($('.icheck', form).length) {
                $('.icheck', form).iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue'
                })
            }
        },
        cxselect: function (form) {
            //多级联动
            if ($("[data-toggle='cxselect']", form).length) {
                $.cxSelect.defaults.jsonName = 'name';
                $.cxSelect.defaults.jsonValue = 'value';
                $.cxSelect.defaults.jsonSpace = 'data';
                $("[data-toggle='cxselect']", form).cxSelect()
            }
        },
        summernote: function(form) {
            if ($(".summernote,.editor", form).length) {
                var note = $(".summernote,.editor", form)
                var imageButton = function (context) {
                    var ui = $.summernote.ui;
                    var button = ui.button({
                        contents: '<i class="fa fa-file-image-o"/>',
                        tooltip: lang('Choose'),
                        click: function () {
                            parent.ModalLayer.open("general/attachment/select?element_id=&multiple=true&mimetype=image/*", lang('Choose'), {
                                callback: function (data) {
                                    var urlArr = data.url.split(/\,/);
                                    $.each(urlArr, function () {
                                        var url = cdnurl(this);
                                        note.summernote('editor.insertImage', url);
                                    });
                                }
                            });
                            return false;
                        }
                    });
                    return button.render();
                };
                var attachmentButton = function (context) {
                    var ui = $.summernote.ui;
                    var button = ui.button({
                        contents: '<i class="fa fa-file"/>',
                        tooltip: lang('Choose'),
                        click: function () {
                            parent.ModalLayer.open("general/attachment/select?element_id=&multiple=true&mimetype=*", lang('Choose'), {
                                callback: function (data) {
                                    var urlArr = data.url.split(/\,/);
                                    $.each(urlArr, function () {
                                        var url = cdnurl(this);
                                        var node = $("<a href='" + url + "'>" + url + "</a>");
                                        note.summernote('insertNode', node[0]);
                                    });
                                }
                            });
                            return false;
                        }
                    });
                    return button.render();
                };
                note.summernote({
                    height: 250,
                    lang: 'zh-CN',
                    fontNames: [
                        'Arial', 'Arial Black', 'Serif', 'Sans', 'Courier',
                        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande',
                        "Open Sans", "Hiragino Sans GB", "Microsoft YaHei",
                        '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆',
                    ],
                    fontNamesIgnoreCheck: [
                        "Open Sans", "Microsoft YaHei",
                        '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆'
                    ],
                    toolbar: [
                        ['style', ['style', 'undo', 'redo']],
                        ['font', ['bold', 'underline', 'strikethrough', 'clear']],
                        ['fontname', ['color', 'fontname', 'fontsize']],
                        ['para', ['ul', 'ol', 'paragraph', 'height']],
                        ['table', ['table', 'hr']],
                        ['insert', ['link', 'picture', 'video']],
                        ['select', ['image', 'attachment']],
                        ['view', ['fullscreen', 'codeview', 'help']],
                    ],
                    buttons: {
                        image: imageButton,
                        attachment: attachmentButton,
                    },
                    dialogsInBody: true,
                    followingToolbar: false,
                    callbacks: {
                        onChange: function (contents) {
                            $(this).val(contents);
                            $(this).trigger('change');
                        },
                        onInit: function () {
                        },
                        onImageUpload: function (files) {
                            var that = this;
                            //依次上传图片
                            for (var i = 0; i < files.length; i++) {
                                Upload.api.send(files[i], function (data) {
                                    var url = Fast.api.cdnurl(data.url);
                                    $(that).summernote("insertImage", url, 'filename');
                                });
                            }
                        }
                    }
                });
            }
        },
        plupload: function (form) {
            if ($(".plupload", form).length) {
                Upload.api.plupload($(".plupload", form))
            }
        },
        faselect: function (form) {
            // 绑定fachoose选择附件事件
            if ($(".fachoose", form).length) {
                $(".fachoose", form).on('click', function () {
                    var that = this;
                    var multiple = $(this).data("multiple") ? $(this).data("multiple") : false;
                    var mimetype = $(this).data("mimetype") ? $(this).data("mimetype") : '';
                    var admin_id = $(this).data("admin-id") ? $(this).data("admin-id") : '';
                    var user_id = $(this).data("user-id") ? $(this).data("user-id") : '';
                    parent.ModalLayer.open("general/attachment/select?element_id=" + $(this).attr("id") + "&multiple=" + multiple + "&mimetype=" + mimetype + "&admin_id=" + admin_id + "&user_id=" + user_id, lang('Choose'), {
                        callback: function (data) {
                            var button = $("#" + $(that).attr("id"));
                            var maxcount = $(button).data("maxcount");
                            var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                            maxcount = typeof maxcount !== "undefined" ? maxcount : 0;
                            if (input_id && data.multiple) {
                                var urlArr = [];
                                var inputObj = $("#" + input_id);
                                var value = $.trim(inputObj.val());
                                if (value !== "") {
                                    urlArr.push(inputObj.val());
                                }
                                urlArr.push(data.url)
                                var result = urlArr.join(",");
                                if (maxcount > 0) {
                                    var nums = value === '' ? 0 : value.split(/\,/).length;
                                    var files = data.url !== "" ? data.url.split(/\,/) : [];
                                    var remains = maxcount - nums;
                                    if (files.length > remains) {
                                        Toastr.error(__('You can choose up to %d file%s', remains));
                                        return false;
                                    }
                                }
                                inputObj.val(result).trigger("change").trigger("validate");
                            } else {
                                $("#" + input_id).val(data.url).trigger("change").trigger("validate");
                            }
                        }
                    });
                    return false;
                });
            }
        },
        fieldlist: function (form) {
            //绑定fieldlist
            if ($(".fieldlist", form).length) {
                //刷新隐藏textarea的值
                var refresh = function (name) {
                    var data = {};
                    var textarea = $("textarea[name='" + name + "']", form);
                    var container = textarea.closest("dl");
                    var template = container.data("template");
                    $.each($("input,select,textarea", container).serializeArray(), function (i, j) {
                        var reg = /\[(\w+)\]\[(\w+)\]$/g;
                        var match = reg.exec(j.name);
                        if (!match)
                            return true;
                        match[1] = "x" + parseInt(match[1]);
                        if (typeof data[match[1]] == 'undefined') {
                            data[match[1]] = {};
                        }
                        data[match[1]][match[2]] = j.value;
                    });
                    var result = template ? [] : {};
                    $.each(data, function (i, j) {
                        if (j) {
                            if (!template) {
                                if (j.key != '') {
                                    result[j.key] = j.value;
                                }
                            } else {
                                result.push(j);
                            }
                        }
                    });
                    textarea.val(JSON.stringify(result));
                };
                //监听文本框改变事件
                $(document).on('change keyup', ".fieldlist input,.fieldlist textarea,.fieldlist select", function () {
                    refresh($(this).closest("dl").data("name"));
                });
                //追加控制
                $(".fieldlist", form).on("click", ".btn-append,.append", function (e, row) {
                    var container = $(this).closest("dl");
                    var index = container.data("index");
                    var name = container.data("name");
                    var template = container.data("template");
                    var data = container.data();
                    index = index ? parseInt(index) : 0;
                    container.data("index", index + 1);
                    var row = row ? row : {};
                    var vars = {index: index, name: name, data: data, row: row};
                    var html = template ? Template(template, vars) : Template.render(Form.config.fieldlisttpl, vars);
                    $(html).insertBefore($(this).closest("dd"));
                    $(this).trigger("fa.event.appendfieldlist", $(this).closest("dd").prev());
                });
                //移除控制
                $(".fieldlist", form).on("click", "dd .btn-remove", function () {
                    var container = $(this).closest("dl");
                    $(this).closest("dd").remove();
                    refresh(container.data("name"));
                });
                //拖拽排序
                $("dl.fieldlist", form).dragsort({
                    itemSelector: 'dd',
                    dragSelector: ".btn-dragsort",
                    dragEnd: function () {
                        refresh($(this).closest("dl").data("name"));
                    },
                    placeHolderTemplate: "<dd></dd>"
                });
                //渲染数据
                $(".fieldlist", form).each(function () {
                    var container = this;
                    var textarea = $("textarea[name='" + $(this).data("name") + "']", form);
                    if (textarea.val() == '') {
                        return true;
                    }
                    var template = $(this).data("template");
                    var json = {};
                    try {
                        json = JSON.parse(textarea.val());
                    } catch (e) {
                    }
                    $.each(json, function (i, j) {
                        $(".btn-append,.append", container).trigger('click', template ? j : {
                            key: i,
                            value: j
                        });
                    });
                });
            }
        },
        switcher: function (form) {
            form.on("click", "[data-toggle='switcher']", function () {
                if ($(this).hasClass("disabled")) {
                    return false;
                }
                var input = $(this).prev("input");
                input = $(this).data("input-id") ? $("#" + $(this).data("input-id")) : input;
                if (input.length > 0) {
                    var yes = $(this).data("yes");
                    var no = $(this).data("no");
                    if (input.val() == yes) {
                        input.val(no);
                        $("i", this).addClass("fa-flip-horizontal text-gray");
                    } else {
                        input.val(yes);
                        $("i", this).removeClass("fa-flip-horizontal text-gray");
                    }
                    input.trigger('change');
                }
                return false;
            });
        },
        // slider: function (form) {
        //     if ($(".slider", form).length) {
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
                $('.form-group', form).removeClass('has-feedback has-success has-error');
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
                //刷新token
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

            events.select2ajax(form)

            events.selectpage(form)

            events.datepicker(form)

            events.daterangepicker(form)

            events.datetimepicker(form)

            events.icheck(form)

            events.plupload(form)

            events.faselect(form)

            events.cxselect(form)

            events.summernote(form)

            events.fieldlist(form);

            events.switcher(form);

            // events.slider(form);

        }
    }
}

export default Form