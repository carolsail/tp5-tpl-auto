//修复URL
function fixurl(url) {
		if (url.substr(0, 1) !== "/") {
				var r = new RegExp('^(?:[a-z]+:)?//', 'i');
				if (!r.test(url)) {
						url = Config.module_url + "/" + url;
				}
		}
		return url
}

// 获取修复后可访问的cdn链接
function cdnurl(url, domain) {
		var rule = new RegExp("^((?:[a-z]+:)?\\/\\/|data:image\\/)", "i");
		var url = rule.test(url) ? url : Config.upload.cdnurl + url
		if (domain && !rule.test(url)) {
				domain = typeof domain === 'string' ? domain : location.origin
				url = domain + url
		}
		return url
}

// dom转对象数组
function serializeObj(e){
	let o = {};
	const a = e.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

// 下载文件
function downloadFile(file, name='file.xls'){
	if(file){
		var $a = $("<a>");
		$a.attr("href",file);
		$("body").append($a);
		$a.attr("download", name);
		$a[0].click();
		$a.remove();
	}
}

// 去左右空格;
function trim(s){
	s = s + ''
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

// 查询url参数
function query(name, url) {
	if (!url) {
			url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&/]" + name + "([=/]([^&#/?]*)|&|#|$)"),
			results = regex.exec(url);
	if (!results)
			return null;
	if (!results[2])
			return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export {fixurl, cdnurl, serializeObj, downloadFile, trim, query}