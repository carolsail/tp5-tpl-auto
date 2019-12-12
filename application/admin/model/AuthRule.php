<?php

namespace app\admin\model;

class AuthRule extends BaseModel
{
    protected static function init()
    {
        self::afterWrite(function ($row) {
            cache('__menu__', null);
        });
    }

    public function getTitleAttr($value, $data)
    {
        return __($value);
    }

}
