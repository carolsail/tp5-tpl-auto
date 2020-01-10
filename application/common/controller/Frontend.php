<?php

namespace app\common\controller;

use app\common\library\Auth;
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

    /**
     * 无需登录的方法,同时也就不需要鉴权了
     * @var array
     */
    protected $noNeedLogin = [];

    /**
     * 无需鉴权的方法,但需要登录
     * @var array
     */
    protected $noNeedRight = [];

    /**
     * 权限Auth
     * @var Auth
     */
    protected $auth = null;

	public function initialize()
    {
    	//移除HTML标签
        $this->request->filter('trim,strip_tags,htmlspecialchars');
        $module_name = $this->request->module();
        $controller_name = Loader::parseName($this->request->controller());
        $action_name = strtolower($this->request->action());
        $path = str_replace('.', '/', $controller_name) . '/' . $action_name;

        // 如果有使用模板布局
        if ($this->layout) {
            $this->view->engine->layout('layout/' . $this->layout);
        }

        $this->auth = Auth::instance();
        $token = $this->request->server('HTTP_TOKEN', $this->request->request('token', \think\facade\Cookie::get('token')));
        // 设置当前请求的URI
        $this->auth->setRequestUri($path);
        // 检测是否需要验证登录
        if (!$this->auth->match($this->noNeedLogin)) {
            //初始化
            $this->auth->init($token);
            //检测是否登录
            if (!$this->auth->isLogin()) {
                $this->error(__('Please login first'), url('user/login'));
            }
            // 判断是否需要验证权限
            if (!$this->auth->match($this->noNeedRight)) {
                // 判断控制器和方法判断是否有对应权限
                if (!$this->auth->check($path)) {
                    $this->error(__('You have no permission'));
                }
            }
        } else {
            // 如果有传递token才验证是否登录状态
            if ($token) {
                $this->auth->init($token);
            }
        }
        // 用户信息传递给模板
        $this->view->assign('user', $this->auth->getUser());

        // 语言检测
        $lang = strip_tags($this->request->langset());

    	$config = [
            'module_name' => $module_name,
            'controller_name' => str_replace('.', '/', $controller_name),
            'action_name' => $action_name,
            'module_url' => rtrim(url("/{$module_name}", '', false), '/'),
            'upload' => config('upload.'),
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