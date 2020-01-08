<?php

namespace app\common\controller;

use think\Controller;
use think\Loader;
use think\facade\Lang;
use think\facade\Env;
use think\facade\Hook;

class Frontend extends Controller
{
    /**
     * 布局模板
     * @var string
     */
    protected $layout = '';

	public function initialize()
    {
    	//移除HTML标签
        $this->request->filter('trim,strip_tags,htmlspecialchars');
        $module_name = $this->request->module();
        $controller_name = Loader::parseName($this->request->controller());
        $action_name = strtolower($this->request->action());

        // 如果有使用模板布局
        if ($this->layout) {
            $this->view->engine->layout('layout/' . $this->layout);
        }

        // 语言检测
        $lang = strip_tags($this->request->langset());

    	$config = [
            'module_name' => $module_name,
            'controller_name' => str_replace('.', '/', $controller_name),
            'action_name' => $action_name,
            'module_url' => rtrim(url("/{$module_name}", '', false), '/'),
            'language' => $lang
        ];
        
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

    /**
     * 渲染配置信息
     * @param mixed $name 键名或数组
     * @param mixed $value 值
     */
    protected function assignconfig($name, $value = '')
    {
        $this->view->config = array_merge($this->view->config ? $this->view->config : [], is_array($name) ? $name : [$name => $value]);
    }
}