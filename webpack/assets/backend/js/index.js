import Form from '../../common/js/form'
import Tabs from '../../common/js/tabs'

export function index(){
    //切换左侧sidebar显示隐藏
    $(document).on("click fa.event.toggleitem", ".sidebar-menu li > a", function (e) {
      $(".sidebar-menu li").removeClass("active");
      //当外部触发隐藏的a时,触发父辈a的事件
      if (!$(this).closest("ul").is(":visible")) {
          //如果不需要左侧的菜单栏联动可以注释下面一行即可
          $(this).closest("ul").prev().trigger("click");
      }

      var visible = $(this).next("ul").is(":visible");
      if (!visible) {
          $(this).parents("li").addClass("active");
      } else {
      }
      e.stopPropagation();
    });

    var nav = $('#navbar-tabs .nav-addtabs')
    //这一行需要放在点击左侧链接事件之前
    var addtabs = Config.referer ? localStorage.getItem("addtabs") : null;
    //绑定tabs事件,如果需要点击强制刷新iframe,则请将iframeForceRefresh置为true
    nav.addtabs({iframeHeight: "100%", iframeForceRefresh: false, nav: nav});

    //首次自动触发
    if ($("ul.sidebar-menu li.active a").length) {
      $("ul.sidebar-menu li.active a").trigger("click");
    } else {
      $("ul.sidebar-menu li a[url!='javascript:;']:first").trigger("click");
    }

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
            Tabs.addtabs(Config.referer);
        }
    }
}

export function login(){
  // Toastr.options.positionClass = "toast-top-center"
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