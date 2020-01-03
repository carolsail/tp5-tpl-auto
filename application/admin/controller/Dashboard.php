<?php

namespace app\admin\controller;

use app\common\controller\Backend;

class Dashboard extends Backend
{
    protected $noNeedRight = ['*'];

    public function index()
    {
        return view();
    }
}
