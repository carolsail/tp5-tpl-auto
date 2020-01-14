<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 会员接口
 */
class User extends Api
{
    protected $noNeedLogin = ['login'];
    protected $noNeedRight = '*';

    public function initialize()
    {
        parent::initialize();
    }

    /**
     * 会员登录
     * 
     * @param string $account 账号
     * @param string $password 密码
     */
    public function login()
    {
        $account = $this->request->request('account');
        $password = $this->request->request('password');
        if (!$account || !$password)
        {
            $this->error(__('Invalid parameters'));
        }
        $ret = $this->auth->login($account, $password);
        if ($ret)
        {
            $data = ['userinfo' => $this->auth->getUserinfo()];
            $this->success(__('Logged in successful'), $data);
        }
        else
        {
            $this->error($this->auth->getError());
        }
    }

    /**
     * 注销登录
     */
    public function logout()
    {
        $this->auth->logout();
        $this->success(__('Logout successful'));
    }
}