<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 多表格示例
 *
 * @remark 当一个页面上存在多个Bootstrap-table时该如何控制按钮和表格
 */
class Multitable extends Backend
{
    protected $model = null;
    protected $noNeedRight = ['table1', 'table2'];

    public function initialize()
    {
        parent::initialize();
    }

    /**
     * 查看
     */
    public function index()
    {
        return $this->view->fetch();
    }

    public function table1()
    {
        $this->model = model('Attachment');
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch('index');
    }

    public function table2()
    {
        $this->model = model('AdminLog');
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch('index');
    }
}
