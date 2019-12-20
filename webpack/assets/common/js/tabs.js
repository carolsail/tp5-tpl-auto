import {fixurl} from './util'

const Tabs = {
  addtabs(url, title, icon) {
    var dom = "a[url='{url}']"
    var leftlink = top.window.$(dom.replace(/\{url\}/, url));
    if (leftlink.length) {
        leftlink.trigger("click");
    } else {
        url = fixurl(url);
        leftlink = top.window.$(dom.replace(/\{url\}/, url));
        if (leftlink.length) {
            var event = leftlink.parent().hasClass("active") ? "dblclick" : "click";
            leftlink.trigger(event);
        } else {
            var baseurl = url.substr(0, url.indexOf("?") > -1 ? url.indexOf("?") : url.length);
            leftlink = top.window.$(dom.replace(/\{url\}/, baseurl));
            //能找到相对地址
            if (leftlink.length) {
                icon = typeof icon !== 'undefined' ? icon : leftlink.find("i").attr("class");
                title = typeof title !== 'undefined' ? title : leftlink.find("span:first").text();
                leftlink.trigger("fa.event.toggleitem");
            }
            var navnode = top.window.$(".nav-tabs ul li a[node-url='" + url + "']");
            if (navnode.length) {
                navnode.trigger("click");
            } else {
                //追加新的tab
                var id = Math.floor(new Date().valueOf() * Math.random());
                icon = typeof icon !== 'undefined' ? icon : 'fa fa-circle-o';
                title = typeof title !== 'undefined' ? title : '';
                top.window.$("<a />").append('<i class="' + icon + '"></i> <span>' + title + '</span>').prop("href", url).attr({
                    url: url,
                    addtabs: id
                }).addClass("hide").appendTo(top.window.document.body).trigger("click");
            }
        }
    }
  },
  closetabs(url) {
    if (typeof url === 'undefined') {
        top.window.$("ul.nav-addtabs li.active .close-tab").trigger("click");
    } else {
        var dom = "a[url='{url}']"
        var navlink = top.window.$(dom.replace(/\{url\}/, url));
        if (navlink.length === 0) {
            url = Fast.api.fixurl(url);
            navlink = top.window.$(dom.replace(/\{url\}/, url));
            if (navlink.length === 0) {
            } else {
                var baseurl = url.substr(0, url.indexOf("?") > -1 ? url.indexOf("?") : url.length);
                navlink = top.window.$(dom.replace(/\{url\}/, baseurl));
                //能找到相对地址
                if (navlink.length === 0) {
                    navlink = top.window.$(".nav-tabs ul li a[node-url='" + url + "']");
                }
            }
        }
        if (navlink.length > 0 && navlink.attr('addtabs')) {
            top.window.$("ul.nav-addtabs li#tab_" + navlink.attr('addtabs') + " .close-tab").trigger("click");
        }
    }
  }
}

export default Tabs
