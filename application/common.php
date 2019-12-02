<?php

use think\facade\Env;

// 应用公共文件

if (! function_exists('mix')) {
    /**
     * Get the path to a versioned Mix file.
     *
     * @param  string  $path
     * @param  string  $manifestDirectory
     * @return \Illuminate\Support\HtmlString
     *
     * @throws \Exception
     */
    function mix($path, $manifestDirectory = '')
    {
        static $manifests = [];

        if (! starts_with($path, '/')) {
            $path = "/{$path}";
        }

        if ($manifestDirectory && ! starts_with($manifestDirectory, '/')) {
            $manifestDirectory = "/static/dist/{$manifestDirectory}";
        }
 
        if (file_exists(public_folder($manifestDirectory.'/hot'))) {
            return "//localhost:8080{$path}";
        }

        $manifestPath = public_folder($manifestDirectory.'/mix-manifest.json');

        if (! isset($manifests[$manifestPath])) {
            if (! file_exists($manifestPath)) {
                throw new Exception('The Mix manifest does not exist.');
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }
        
        $manifest = $manifests[$manifestPath];
        if (! isset($manifest[$path])) {
            throw new Exception(
                "Unable to locate Mix file: {$path}. Please check your ".
                'webpack.mix.js output paths and try again.'
            );
        }
        
        return public_path($manifestDirectory.$manifest[$path]);
    }
}

if (! function_exists('starts_with')) {
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param  string  $haystack
     * @param  string|array  $needles
     * @return bool
     */
    function starts_with($haystack, $needles)
    {
        foreach ((array) $needles as $needle) {
            if ($needle != '' && substr($haystack, 0, strlen($needle)) === (string) $needle) {
                return true;
            }
        }

        return false;
    }
}

if (! function_exists('public_folder')) {
    /**
     * Get the path to the public folder.
     *
     * @param  string  $path
     * @return string
     */
    function public_folder($path = '')
    {
        if ($path) {
            $path = Env::get('root_path') . 'public/' . ltrim($path, '/');
            // $path = DIRECTORY_SEPARATOR.ltrim($path, DIRECTORY_SEPARATOR);
        }else {
            $path = Env::get('root_path') . 'public/';
        }
        return $path;
    }
}

if (! function_exists('public_path')) {
    /** 
     * public路径, 模板中静态资源引用
     * @param  string  $path
     * @return string
     */
    function public_path($path = '')
    {
        //去index.php
        $path = '/' . ltrim($path, '/');
        return str_replace('/index.php', '', request()->root()) . $path;
    }
}