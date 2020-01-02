<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 彩色角标
 *
 * @remark 在JS端控制角标的显示与隐藏,请注意左侧菜单栏角标的数值变化
 */
class Colorbadge extends Backend
{
    protected $model = null;

    public function initialize()
    {
        parent::initialize();
        $this->model = model('AdminLog');
    }
}
