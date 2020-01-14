<?php

namespace app\admin\model;

class UserRule extends BaseModel
{
    // 追加属性
    protected $append = [
        'status_text'
    ];

    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            $row->getQuery()->where($pk, $row[$pk])->update(['weigh' => $row[$pk]]);
        });
    }

    public function getStatusList()
    {
        return ['normal' => __('Normal'), 'hidden' => __('Hidden')];
    }

    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : $data['status'];
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public static function getTreeList($selected = [])
    {
        $ruleList = self::where('status', 'normal')->order('weigh desc,id desc')->select()->toArray();
        $nodeList = [];
        foreach ($ruleList as $k => $v) {
            $state = array('selected' => $v['ismenu'] ? false : in_array($v['id'], $selected));
            $nodeList[] = array('id' => $v['id'], 'parent' => $v['pid'] ? $v['pid'] : '#', 'text' => __($v['title']), 'type' => 'menu', 'state' => $state);
        }
        return $nodeList;
    }

}
