/**

 @Name：testTablePlug tablePlug测试页面引用的组件
 @Author：岁月小偷
 @License：MIT

 */
// layui.config({base: 'layui/plug/'})
layui.config({base: 'download/tablePlug/'})
  .extend({tablePlug: 'tablePlug.min'})
  // .extend({tablePlug: 'tablePlug/tablePlug'})
  .define(['tablePlug', 'laydate'], function (exports) {
    "use strict";

    var $ = layui.$,
      form = layui.form,
      layer = layui.layer,
      table = layui.table,
      laydate = layui.laydate,
      tablePlug = layui.tablePlug;
//	var table.thisTable = thisTable,
//  	table.Class = Class;
    // 重置选中状态的按钮点击触发
    window.resetCheckboxStatus = function (elem) {
      elem = $(elem);
      var tableId = elem.data('id');
      tablePlug.tableCheck.reset(tableId);
      // 如果是data模式的需要重新同步一下数据
      var tableConfig = tablePlug.getConfig(tableId);
      !tableConfig.url && tableConfig.data && tablePlug.dataRenderChecked(tableConfig.data, tableId);
      table.reload(tableId, {
        page: {curr: 1}
      });
    };

    // 是否跨页的开关监听
    form.on('switch(statusSwitch)', function (data) {
      var elem = $(data.elem);
      var formElem = elem.closest('.layui-form');
      var tableElem = formElem.next('table');

      var tableId = tableElem.next() ? (tableElem.next().attr('lay-id') || tableElem.attr('id')) : tableElem.attr('id');
      tablePlug.tableCheck.reset(tableId);
      table.reload(tableId, {
        checkStatus: data.elem.checked ? {} : null,
        page: {
          curr: 1
        }
      });
    });

    // 是否启用智能reload
    form.on('switch(smartSwitch)', function (data) {
      tablePlug.smartReload.enable(data.elem.checked);
      $('[lay-event="reload"][data-url="data11"]').first().click();
    });

    // 当前表格要不要智能reload
    form.on('switch(tableSmartSwitch)', function (data) {

      var elem = $(data.elem);
      var formElem = elem.closest('.layui-form');
      var tableElem = formElem.next('table');

      var tableId = tableElem.next() ? (tableElem.next().attr('lay-id') || tableElem.attr('id')) : tableElem.attr('id');
      tablePlug.tableCheck.reset(tableId);
      table.reload(tableId, {
        smartReloadModel: data.elem.checked
      });

    });

    //监听头工具栏事件
    table.on('toolbar(test)', function (obj) {
      var config = obj.config;
      var btnElem = $(this);
      var tableId = config.id;
      // var tableView = config.elem.next();
      switch (obj.event) {
        case 'addTempData':
          table.addTemp(tableId, function (trElem) {
            // 进入回调的时候this是当前的表格的config
            var that = this;
            // 初始化laydate
            layui.each(trElem.find('td[data-field="birthday"]'), function (index, tdElem) {
              tdElem.onclick = function (event) {
                layui.stope(event);
              };
              laydate.render({
                elem: tdElem.children[0],
                format: 'yyyy/MM/dd',
                done: function (value, date) {
                  var trElem = $(this.elem[0]).closest('tr');
                  table.cache[that.id][trElem.data('index')]['birthday'] = value;
                }
              })
            })
          });
          break;
        case 'getTempData':
          layer.alert('临时数据:' + JSON.stringify(table.getTemp(tableId).data));
          break;
        case 'cleanTempData':
          table.cleanTemp(tableId);
          layer.msg('临时数据已删除');
          break;
        case 'openSelect':
          layer.open({
            type: 1,
            title: '测试下拉效果单页面',
            area: ['300px', '160px'],
            content: '<div class="layui-form" style="padding: 20px;"><select><option value="1">北京</option><option value="2">上海</option><option value="3">广州</option><option value="4">深圳</option></select></div>',
            success: function (layero, index) {
              form.render();
            }
          });
          break;
        case 'openIframeSelect':
          layer.open({
            type: 2,
            title: '测试下拉效果iframe',
            shade: false,
            area: ['300px', '160px'],
            content: 'testIframe.html?time=' + new Date().getTime(),
            success: function (layero, index) {
            }
          });
          break;
        case 'autoReload':
          if (!layui._autoReloadIndex) {
            layui._autoReloadIndex = setInterval(function () {
              table.reload(tableId, {});
            }, 300);
          } else {
            clearInterval(layui._autoReloadIndex);
            layui._autoReloadIndex = 0;
          }
          break;
        case 'LAYTABLE_EXPORT':
          // 点击导出图标的时候
          $(this).find('.layui-table-tool-panel li').unbind('click').click(function () {
            // 干掉了原始的事件了，自己定义需要的
            var dataTemp = table.cache[tableId];
            if (!dataTemp || !dataTemp.length) {
              // 处理如果没有数据的时候导出为空的excel，没有导出thead的问题
              dataTemp = [{}];
            }
            // 实际可以根据需要还可以直接请求导出全部，或者导出选中的数据而不是只导出当前的页的数据
            table.exportFile(tableId, dataTemp, $(this).data('type'));
          });
          break;
        case 'getChecked':
          layer.alert(JSON.stringify(table.checkStatus(tableId).data));
          break;
        case 'getCheckedStatus':
          var status = table.checkStatus(tableId).status;
          layer.alert('新增的：' + JSON.stringify(status[tablePlug.CHECK_TYPE_ADDITIONAL]) + '<br>'
            + '删除的：' + JSON.stringify(status[tablePlug.CHECK_TYPE_REMOVED]));
          break;
        case 'deleteSome':
          // 获得当前选中的，不管它的状态是什么？只要是选中的都会获得
          var checkedIds = tablePlug.tableCheck.getChecked(tableId);
          layer.confirm('您是否确定要删除选中的' + checkedIds.length + '条记录？', function () {
            layer.alert('do something with: ' + JSON.stringify(checkedIds));
          });
          break;
        case 'jump':
          var pageCurr = btnElem.data('page');
          table.reload(config.id, {url: 'json/data1' + pageCurr + '.json', page: {curr: pageCurr}});
          break;
        case 'reload':
          var options = {page: {curr: 1}};
          var urlTemp = btnElem.data('url');
          if (urlTemp) {
            options.url = 'json/' + urlTemp + '.json';
          }
          var optionTemp = eval('(' + (btnElem.data('option') || '{}') + ')');

          table.reload(config.id, $.extend(true, options, optionTemp));
          break;
        case 'reloadIns':
          tablePlug.getIns(config.id).reload({
            // page: false
          });
          break;
        case 'setDisabled':
          // tablePlug.tableCheck.disabled(config.id, [10003, 10004, 10010]);
          // table.reload(tableId, {});
          tablePlug.disabledCheck(tableId, [10003, 10004, 10010]);
          break;
        case 'setDisabledNull':
          tablePlug.disabledCheck(tableId, false);
          break;
        case 'ranksConversion':
          // 表格行列转换
          break;
      }
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data //获得当前行数据
        , layEvent = obj.event //获得 lay-event 对应的值
        , trCurr = obj.tr
        , tableId = trCurr.closest('.layui-table-view').attr('lay-id')
        , trIndex = trCurr.data('index');

      if (layEvent === 'detail') {
        layer.msg('查看操作(' + data.id + ')');
        layer.alert(JSON.stringify(data));
      } else if (layEvent === 'del') {
        layer.confirm('真的删除行么', function (index) {
          obj.del(); //删除对应行（tr）的DOM结构
          layer.close(index);
          //向服务端发送删除指令
          if (!table.cache[tableId].filter(function (value) {
            return value.id;
          }).length) {
            var configTemp = tablePlug.getConfig(tableId);
            if (configTemp.page && configTemp.page.curr > 1) {
              table.reload(tableId, {
                page: {
                  curr: configTemp.page.curr - 1
                }
              })
            }
          }
        });
      } else if (layEvent === 'edit') {
        layer.msg('编辑操作(' + data.id + ')');
      } else if (layEvent === 'editField') {
        // 编辑字段，先把原始的值保存起来，后面校验失败的时候如果要回滚可以用到，
        var field = $(this).data('field');
        if (!field) {
          return;
        }
        if (!data[field] && data[field] !== 0) {
          data[field] = '';
        }

        table._dataTemp = table._dataTemp || {};
        table._dataTemp[tableId] = table._dataTemp[tableId] || {};
        table._dataTemp[tableId][trIndex] = data;
      } else if (layEvent === 'moveUp') {
        var trPrev = trCurr.prev();
        if (!trPrev.length) {
          layer.msg('已经是第一个节点了', {time: 1000, anim: 6});
          return;
        }
        layui.each(trCurr, function (index, elem) {
          elem = $(elem);
          // 将节点移动到上一个位置去
          elem.insertBefore(elem.prev());
        });

        var indexPrev = trPrev.data('index');
        var numbersCurr = trCurr.find('.laytable-cell-numbers');
        if (numbersCurr.length) {
          // 存在序号列
          numbersCurr = numbersCurr.first().text();
          var numberPrev = trPrev.find('.laytable-cell-numbers').first().text();
          trCurr.find('div.layui-table-cell.laytable-cell-numbers').html(numberPrev);
          trPrev.find('div.layui-table-cell.laytable-cell-numbers').html(numbersCurr);
        }

      }
    });

    exports('testTablePlug', {});
  });


