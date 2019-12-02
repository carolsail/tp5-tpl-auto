// 格式化地址
function fixurl(url, module=true){
	var fixurl = ''
	if(url.substring(0,4)=='http'){
		fixurl = url
	}else{
		if(url.substring(0,1)=='/'){
			url = url.substr(1);
		}
		fixurl = module ? Config.base_url + "/" + Config.module_name + '/' + url : Config.base_url + "/" + url
	}
	return fixurl
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

export {fixurl, serializeObj, downloadFile, trim, query}