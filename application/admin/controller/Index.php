<?php

namespace app\admin\controller;

use app\common\controller\Backend;

class Index extends Backend
{
    public function index()
    {
        return view();
    }

    public function login()
    {
        $this->view->engine->layout('layout/blank');
        return view();
    }
}
