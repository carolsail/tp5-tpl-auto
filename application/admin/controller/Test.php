<?php

namespace app\admin\controller;

use app\common\controller\Backend;

class Test extends Backend
{
    public function ajax()
    {
        if ($this->request->isAjax()) {
            input('param.type') === 'success' ? $this->success('success') : $this->error('error');
        }
        return view();
    }

    public function form()
    {
        if ($this->request->isPost()) {
            $this->success('error');
        }
        return view();
    }
}
