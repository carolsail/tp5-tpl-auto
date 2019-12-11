<?php
namespace app\admin\validate;

class Login extends BaseValidate
{
    protected $rule = [];

    protected $message = [];

    public function __construct() {
      $rule = [
          'username' => 'require|isNotEmpty|length:3,30',
          'password' => 'require|isNotEmpty|length:3,30',
          '__token__' => 'require|token'
      ];
      if(config('site.login_captcha')) {
        $rule['captcha'] = 'require|isNotEmpty|captcha';
      }
      $this->rule = $rule;
    }
}