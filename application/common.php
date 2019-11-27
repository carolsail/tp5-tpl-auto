<?php

// 应用公共文件

if (!function_exists('build_assets')) {
    /**
     * 遍历webpack.php中css | js
     * @param string $entry 入口名
     * @param string $type 资源类型
     * @return string
     */
    function build_assets($entry, $type='js')
    {
        $back = '';
        $map = config('webpack.');
        $assets = $map[$type];
        if (isset($assets[$entry])) {
        	foreach ($assets[$entry] as $v) {
                if (strpos($v, 'http')===false) {
                    $v = rtrim(url("/", '', false), '/') . '/static' . $v;
                }
        		$back .= $type === 'js' ? '<script src="' . $v . '"></script>' : '<link rel="stylesheet" href="' . $v . '">';
        	}
        }
        return $back;
    }
}
