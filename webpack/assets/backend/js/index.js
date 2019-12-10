import Form from '../../common/js/form'

export function login(){
  //Toastr.options.positionClass = "toast-top-center"
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
    console.log(data, 111)
  }, function(data){
    console.log(data, 222)
  })
}