<?php
namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{
    protected $layout = 'default';
    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    
    public function index()
    {
        return view();
    }
}
