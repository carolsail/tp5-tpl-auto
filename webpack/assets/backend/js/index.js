import Form from '@common/form'
import {fixurl, lang as __} from '@common/util';

export function index(){
    //修复在移除窗口时下拉框不隐藏的BUG
    $(window).on("blur", function () {
      $("[data-toggle='dropdown']").parent().removeClass("open");
      if ($("body").hasClass("sidebar-open")) {
          $(".sidebar-toggle").trigger("click");
      }
    })

    // 清除缓存
    if($('.wipecache').length){
      $('.wipecache').click(function(){
        Layer.confirm(__('Are you sure to wipe cache?'), {'title': __('Tips')}, function(index){
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

    //切换左侧sidebar显示隐藏
    $(document).on("click fa.event.toggleitem", ".sidebar-menu li > a", function (e) {
      if($(this).parent('li').hasClass('treeview')){
        //点击二级
        //console.log('点击2级')
      }else{
          $(".sidebar-menu li").removeClass("active");
          if($(this).parents('ul').hasClass('treeview-menu')){
            //点击三级
            //console.log('点击3级')
            $(this).parents("li").addClass("active");
            $(this).closest('.treeview').addClass('menu-open')
            $(this).closest('.treeview-menu').css('display', 'block')
          }else{
            //点击一级
            //console.log('点击1级')
            $(this).parent('li').addClass('active')
            $('.sidebar-menu .treeview').removeClass('menu-open')
            $('.sidebar-menu .treeview-menu').css('display', 'none')
          }
      }
      e.stopPropagation();
    });

    var nav = $('#navbar-tabs .nav-addtabs')
    //这一行需要放在点击左侧链接事件之前
    var addtabs = Config.referer ? localStorage.getItem("addtabs") : null;
    //绑定tabs事件,如果需要点击强制刷新iframe,则请将iframeForceRefresh置为true
    nav.addtabs({iframeHeight: "100%", iframeForceRefresh: false, nav: nav});

    //如果是刷新操作则直接返回刷新前的页面
    if (Config.referer) {
        if (Config.referer === $(addtabs).attr("url")) {
            var active = $("ul.sidebar-menu li a[addtabs=" + $(addtabs).attr("addtabs") + "]");
            if (active.length) {
                active.trigger("click");
            } else {
                $(addtabs).appendTo(document.body).addClass("hide").trigger("click");
            }
        } else {
            //刷新页面后跳到到刷新前的页面
            Backend.api.addtabs(Config.referer);
        }
    }
}

export function login(){
  const form = $("form[role=form]")
  // 验证提示
  form.data("validator-options", {
      invalid: function (element, errors) {
          $.each(errors, function (i, j) {
              Toastr.error(j);
          });
      },
      target: '#errtips'
  })
  Form.api.bindevent(form, function(data){
    // 本地缓存
    localStorage.setItem("lastlogin", JSON.stringify({
        id: data.id,
        username: data.username,
        avatar: data.avatar
    }))
  }, function(){
    // 刷新验证码
    $("input[name=captcha]").next(".input-group-addon").find("img").trigger("click")
  })

}