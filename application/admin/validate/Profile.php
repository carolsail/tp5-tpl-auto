<?php
namespace app\admin\validate;

class Profile extends BaseValidate
{
    protected $rule = [
      'email' => 'require|isNotEmpty|email',
      'nickname' => 'require|isNotEmpty',
      'password' => 'require|isNotEmpty|password', // 6~16位不含空字符
      '__token__' => 'require|token'
    ];

    protected $message = [];

    public function password($value, $rule='', $data='', $field=''){
      $rule = '^[\S]{6,16}$';
      $result = preg_match($rule, $value);
      if ($result) {
          return true;
      } else {
          return false;
      }
    }
}