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
            $params = $this->request->post("row/a");
            print_r($params);
            $this->success();
        }
        return view();
    }

    public function modal()
    {
        if ($this->request->isAjax()) {
            if ($this->request->isGet()) {
                $this->view->engine->layout(false);
                return view('test/modal_form');
            }

            if ($this->request->isPost()) {
                $this->success('');
            }
        }
        return view();
    }

    public function table()
    {
        return view();
    }
}
