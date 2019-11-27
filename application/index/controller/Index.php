<?php
namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{
    public function index()
    {
        return view();
    }

    public function hello($name = 'ThinkPHP5')
    {
        return 'hello,' . $name;
    }
}
