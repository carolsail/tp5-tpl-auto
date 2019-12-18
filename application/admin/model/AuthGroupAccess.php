<?php

namespace app\admin\model;

class AuthGroupAccess extends BaseModel
{
    protected static function init()
    {
        self::afterWrite(function ($row) {
            cache('__user_groups__', null);
        });
    }
}
