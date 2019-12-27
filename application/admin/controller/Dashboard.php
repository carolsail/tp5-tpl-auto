<?php

namespace app\admin\controller;

use app\common\controller\Backend;

class Dashboard extends Backend {
  
  protected $noNeedRight = ['*'];

  public function index(){
    return view();
  }

  public function modal()
  {
      if ($this->request->isAjax()) {
          if ($this->request->isGet()) {
              $this->view->engine->layout(false);
              return view('dashboard/modal_bootstrap');
          }
      }

      if ($this->request->isPost()) {
          $params = $this->request->post("row/a");
          $this->success('success');
      }
      return view('dashboard/modal_layer');
  }

  public function ajax()
  {
      if ($this->request->isAjax()) {
          input('param.type') === 'success' ? $this->success('success') : $this->error('error');
      }
  }

  public function select2ajax()
  {
      $this->model = model('Category');
      return parent::select2ajax();
  }
}