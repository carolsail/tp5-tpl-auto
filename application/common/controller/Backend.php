<?php

namespace app\common\controller;

use think\Controller;
use think\facade\Hook;
use think\Loader;
use think\facade\Env;
use think\facade\Lang;

class Backend extends Controller
{
	/**
     * 布局模板
     * @var string
     */
    protected $layout = 'default';

	public function initialize()
    {
        $module_name = $this->request->module();
        $controller_name = Loader::parseName($this->request->controller());
        $action_name = strtolower($this->request->action());
        $upload = config('upload.');

    	$config = [
    		'module_name' => $module_name,
    		'controller_name' => $controller_name,
            'action_name' => $action_name,
            'module_url' => rtrim(url("/{$module_name}", '', false), '/'),
            'upload' => $upload,
        ];
        
        // 如果有使用模板布局
        if ($this->layout) {
            $this->view->engine->layout('layout/' . $this->layout);
        }

        // 加载当前控制器语言包
        $this->loadlang($controller_name);
        // 将语言包传递到前台config
        $config['lang'] = Lang::get();

    	// 配置信息后
        Hook::listen("config_init", $config);
        $this->assign('config', $config);
    }

    /**
     * 加载语言文件
     * @param string $name
     */
    protected function loadlang($name)
    {
        Lang::load(Env::get('app_path') . $this->request->module() . '/lang/' . $this->request->langset() . '/' . str_replace('.', '/', $name) . '.php');
    }

}