<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 多级联动
 *
 * @remark 使用了jQuery-cxselect实现多级联动,更多文档请参考https://github.com/karsonzhang/cxSelect
 */
class Cxselect extends Backend
{
    protected $model = null;

    public function initialize()
    {
        parent::initialize();
    }
}
