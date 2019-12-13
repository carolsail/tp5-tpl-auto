<?php

return [
  //登录是否开启验证码
  'login_captcha' => false, 
  //登录失败超过10次则1天后重试
  'login_failure_retry' => true,
  //是否同一账号同一时间只能在一个地方登录
  'login_unique' => false,
  //是否开启IP变动检测
  'loginip_check'      => true,
];