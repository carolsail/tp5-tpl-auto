<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\facade\Hook;
use app\admin\validate\Login;
use app\admin\model\AdminLog;
use think\facade\Env;

class Index extends Backend
{
    protected $noNeedLogin = ['login'];
    protected $noNeedRight = ['index', 'logout'];
    protected $layout = '';

    public function index()
    {
        // 刷新左侧sidebar-menu
        if ($this->request->isPost()) {
            $action = $this->request->request('action');
            if ($action == 'refreshmenu') {
                AdminLog::setTitle(__('Refresh Menu'));
                // 拖动修改weigh的时候需要重新获取menulist
                cache('__menu__', null);
                cache('__menu_index__', null);
                list($menulist, $navlist, $fixedmenu, $referermenu) = $this->auth->getSidebar(['index' => 'hot'], config('site.fixedpage'));
                $this->success('', null, ['menulist' => $menulist, 'navlist' => $navlist]);
            }
        }else {
            list($menulist, $navlist, $fixedmenu, $referermenu) = $this->auth->getSidebar(['index' => 'hot'], config('site.fixedpage'));
        }
        $this->view->assign('menulist', $menulist);
        $this->view->assign('navlist', $navlist);
        $this->view->assign('fixedmenu', $fixedmenu);
        $this->view->assign('referermenu', $referermenu);
        $this->view->assign('title', __('Home'));
        return $this->view->fetch();
    }

    public function login()
    {
        // 获取未登录前访问的url参数, 若不存在则默认跳转为首页
        $url = $this->request->get('url', 'index/index');
        if ($this->auth->isLogin()) {
            $this->success(__("You've logged in, do not login again"), $url);
        }

        if ($this->request->isPost()) {
            $validate = new Login;
            if (!$validate->goCheck()) {
                // 传回token便客户端刷新token
                $this->error($validate->getError(), $url, ['token' => $this->request->token()]);
            }
            AdminLog::setTitle(__('Login'));
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $keeplogin = $this->request->post('keeplogin');
            $result = $this->auth->login($username, $password, $keeplogin ? 86400 : 0);
            if ($result === true) {
                Hook::listen("admin_login_after", $this->request);
                $this->success(__('Login successful'), $url, ['url' => $url, 'id' => $this->auth->id, 'username' => $username, 'avatar' => $this->auth->avatar]);
            } else {
                $msg = $this->auth->getError();
                $msg = $msg ? $msg : __('Username or password is incorrect');
                $this->error($msg, $url, ['token' => $this->request->token()]);
            }
        }

        // 根据客户端的cookie,判断是否可以自动登录
        if ($this->auth->autologin()) {
            $this->redirect($url);
        }
        Hook::listen("admin_login_init", $this->request);
        return view();
    }

    public function logout()
    {
        $this->auth->logout();
        Hook::listen("admin_logout_after", $this->request);
        $this->success(__('Logout successful'), 'index/login');
    }
}
