<?php

namespace app\common\controller;

use think\Controller;
use think\facade\Hook;

class Backend extends Controller
{
	
	public function initialize()
    {
    	//移除HTML标签
        $this->request->filter('strip_tags');
        $module_name = $this->request->module();
        $controller_name = strtolower($this->request->controller());
        $action_name = strtolower($this->request->action());

    	$config = [
    		'module_name' => $module_name,
    		'controller_name' => $controller_name,
    		'action_name' => $action_name
    	];

    	// 配置信息后
        Hook::listen("config_init", $config);
        $this->assign('config', $config);
    }

}