<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 自定义搜索
 *
 * @remark 自定义列表的搜索
 */
class Customsearch extends Backend
{
    protected $model = null;

    public function initialize()
    {
        parent::initialize();
        $this->model = model('AdminLog');
        $ipList = $this->model->whereTime('create_time', '-37 days')->group("ip")->column("ip,ip as aa");
        $this->view->assign("ipList", $ipList);
    }
}
