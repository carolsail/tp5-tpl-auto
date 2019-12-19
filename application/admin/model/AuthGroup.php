<?php

namespace app\admin\model;

class AuthGroup extends BaseModel
{
    public function getNameAttr($value, $data)
    {
        return __($value);
    }
}
