import Form from '../../common/js/form'

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