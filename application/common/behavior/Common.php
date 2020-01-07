<?php

namespace app\common\behavior;

use think\facade\Config;
use think\Request;
use think\facade\Env;

class Common
{
    public function moduleInit(Request $request)
    {
        // 设置mbstring字符编码
        mb_internal_encoding("UTF-8");

        // 如果是开发模式那么将异常模板修改成官方的
        if (Config::get('app.app_debug'))
        {
            Config::set('app.exception_tmpl', Env::get('think_path') . 'tpl' . DIRECTORY_SEPARATOR . 'think_exception.tpl');
        }
        
        // 切换多语言
        if (Config::get('lang_switch_on') && $request->get('lang')) {
            \think\facade\Cookie::set('think_var', $request->get('lang'));
        }
    }
}
