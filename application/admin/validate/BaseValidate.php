<?php
namespace app\admin\validate;

use think\Validate;

class BaseValidate extends Validate
{
    public $_error = '';

    public function goCheck($data='', $scene=''){
        $params = $data ? $data : input('param.');
        $validate = $scene ? $this->scene($scene) : $this;
        if(!$validate->check($params)){
          $error_msg = is_array($this->error) ? implode(';', $this->error) : $this->error;
          $this->_error = $error_msg;
          return false;
        }
        return true;
    }

    public function getError()
    {
        return $this->_error ? __($this->_error) : '';
    }

    //大于0整数
    public function isInteger($value, $rule='', $data='', $field=''){
        if (is_numeric($value) && is_int($value + 0) && ($value + 0) > 0) {
            return true;
        }
        return false;
    }

    //非空
    public function isNotEmpty($value, $rule='', $data='', $field=''){
        if (empty(trim($value))) {
            return false;
        }
        return true;
    }

    //手机号
    public function isMobile($value, $rule='', $data='', $field=''){
        $rule = '^1(3|4|5|7|8)[0-9]\d{8}$^';
        $result = preg_match($rule, $value);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

}