<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 表格模板
 *
 * @remark 可以通过使用表格模板将表格中的行渲染成一样的展现方式，基于此功能可以任意定制自己想要的展示列表
 */
class Tabletemplate extends Backend
{
    protected $model = null;

    public function initialize()
    {
        parent::initialize();
        $this->model = model('AdminLog');
    }
}
