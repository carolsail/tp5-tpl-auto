import {fixurl} from './util'

const ModalLayer = {
  config: {},
  // 打开一个弹出窗口
  open: function (url, title, options) {
    title = options && options.title ? options.title : (title ? title : "");
    url = fixurl(url);
    url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
    var area = ModalLayer.config.openArea != undefined ? ModalLayer.config.openArea : [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
    options = $.extend({
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        maxmin: true,
        moveOut: true,
        area: area,
        content: url,
        zIndex: Layer.zIndex,
        success: function (layero, index) {
            var that = this;
            //存储callback事件
            $(layero).data("callback", that.callback);
            //$(layero).removeClass("layui-layer-border");
            Layer.setTop(layero);
            try {
                var frame = Layer.getChildFrame('html', index);
                var layerfooter = frame.find(".layer-footer");
                ModalLayer.layerfooter(layero, index, that);

                //绑定事件
                if (layerfooter.length) {
                    // 监听窗口内的元素及属性变化
                    // Firefox和Chrome早期版本中带有前缀
                    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    if (MutationObserver) {
                        // 选择目标节点
                        var target = layerfooter[0];
                        // 创建观察者对象
                        var observer = new MutationObserver(function (mutations) {
                            ModalLayer.layerfooter(layero, index, that);
                            mutations.forEach(function (mutation) {});
                        });
                        // 配置观察选项:
                        var config = {attributes: true, childList: true, characterData: true, subtree: true}
                        // 传入目标节点和观察选项
                        observer.observe(target, config);
                        // 随后,你还可以停止观察
                        // observer.disconnect();
                    }
                }
            } catch (e) {

            }
            if ($(layero).height() > $(window).height()) {
                //当弹出窗口大于浏览器可视高度时,重定位
                Layer.style(index, {
                    top: 0,
                    height: $(window).height()
                });
            }
        }
    }, options ? options : {});
    if ($(window).width() < 480 || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && top.$(".tab-pane.active").length > 0)) {
        options.area = [top.$(".tab-pane.active").width() + "px", top.$(".tab-pane.active").height() + "px"];
        options.offset = [top.$(".tab-pane.active").scrollTop() + "px", "0px"];
    }
    return Layer.open(options);
  },
  // 关闭窗口并回传数据
  close: function (data={}) {
      var index = parent.Layer.getFrameIndex(window.name);
      var callback = parent.$("#layui-layer" + index).data("callback");
      //再执行关闭
      parent.Layer.close(index);
      //再调用回传函数
      if (typeof callback === 'function') {
          callback.call(undefined, data);
      }
  },
  // 封装底部按钮操作替换form中的按钮操作
  layerfooter: function (layero, index, that) {
      var layerIndex = index
      var frame = Layer.getChildFrame('html', index);
      var layerfooter = frame.find(".layer-footer");
      if (layerfooter.length) {
          $(".layui-layer-footer", layero).remove();
          var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
          footer.html(layerfooter.html());
          if ($(".row", footer).length === 0) {
              $(">", footer).wrapAll("<div class='row'></div>");
          }
          footer.insertAfter(layero.find('.layui-layer-content'));
          //绑定事件
          footer.on("click", ".btn", function () {
              if ($(this).attr("disabled") || $(this).parent().attr("disabled")) {
                  return;
              }
              // button的type: submit, reset, button
              if($(this).attr('type') === 'button') {
                  // 直接关闭layer
                  layer.close(layerIndex)
                  $('.btn-refresh').trigger('click')
                  return
              }
              var index = footer.find('.btn').index(this);
              $(".btn:eq(" + index + ")", layerfooter).trigger("click");
          });

          var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
          var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
          //重设iframe高度
          $("iframe", layero).height(layero.height() - titHeight - btnHeight);
      }
      //修复iOS下弹出窗口的高度和iOS下iframe无法滚动的BUG
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
          var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
          var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
          $("iframe", layero).parent().css("height", layero.height() - titHeight - btnHeight);
          $("iframe", layero).css("height", "100%");
      }
  }
}

window.ModalLayer = ModalLayer
export default ModalLayer