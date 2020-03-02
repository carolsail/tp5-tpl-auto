# tp5-tpl-auto

> 运行环境要求PHP5.6以上。

## 安装

+ composer install

## Laravel-mix

+ npm install
+ npm run dev / dev-admin
+ npm run watch / watch-admin
+ npm run prod / prod-admin

## php think

```
//生成test表的CRUD
php think crud -t test
//生成test表的CRUD且一键生成菜单
php think crud -t test -u 1
//删除test表生成的CRUD
php think crud -t test -d 1
//生成test表的CRUD且控制器生成在二级目录下
php think crud -t test -c mydir/test
//生成test_log表的CRUD且生成对应的控制器为testlog
php think crud -t test_log -c testlog
//生成test表的CRUD且对应的模型名为testmodel
php think crud -t test -m testmodel
//生成test表的CRUD且生成关联模型category，外链为category_id，关联表主键为id
php think crud -t test -r category -k category_id -p id
//生成test表的CRUD且所有以list或data结尾的字段都生成复选框
php think crud -t test --setcheckboxsuffix=list --setcheckboxsuffix=data
//生成test表的CRUD且所有以image和img结尾的字段都生成图片上传组件
php think crud -t test --imagefield=image --imagefield=img
//关联多个表,参数传递时请按顺序依次传递，支持以下几个参数relation/relationmodel/relationforeignkey/relationprimarykey/relationfields/relationmode
php think crud -t test --relation=category --relation=admin --relationforeignkey=category_id --relationforeignkey=admin_id
```

```
//一键生成test控制器的权限菜单
php think menu -c test
//一键生成mydir/test控制器的权限菜单
php think menu -c mydir/test
//删除test控制器生成的菜单
php think menu -c test -d 1
//一键全部重新所有控制器的权限菜单
php think menu -c all-controller
```

## 多語言bug
* thinkphp/library/think/Lang.php detect()
```
 elseif (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    // 自动侦测浏览器语言
    preg_match('/^([a-z\d\-]+)/i', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $matches);
    $langSet = strtolower($matches[1]);
    if (isset($this->acceptLanguage[$langSet])) {
        $langSet = $this->acceptLanguage[$langSet];
    }
    //======加入=============不檢查瀏覽器accept-language, 直接用配置中的默認語言
    $langSet = config('app.lang_default');
}
```