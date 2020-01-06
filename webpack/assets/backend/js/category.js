import Table from '@common/table'
import Form from '@common/form'
import {fixurl, lang as __} from '@common/util'

const api = {
    bindevent() {
        $(document).on("change", "#c-type", function () {
            $("#c-pid option[data-type='all']").prop("selected", true);
            $("#c-pid option").removeClass("hidden");
            $("#c-pid option[data-type!='" + $(this).val() + "'][data-type!='all']").addClass("hidden");
        })
        $("#c-type").trigger('change')
        Form.api.bindevent($("form[role=form]"))
    }
}

export function index() {
    // 初始化表格参数配置
    Table.api.init({
        extend: {
            index_url: fixurl('category/index'),
            add_url: fixurl('category/add'),
            edit_url: fixurl('category/edit'),
            del_url: fixurl('category/del'),
            multi_url: fixurl('category/multi'),
            table: 'category',
        }
    });

    var table = $("#table");
    // 初始化表格
    table.bootstrapTable({
        url: $.fn.bootstrapTable.defaults.extend.index_url,
        escape: false, // 不对内容转义
        pk: 'id',
        sortName: 'weigh',
        pagination: false,
        commonSearch: false,
        columns: [
            [
                {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'type', title: __('Type')},
                        {field: 'name', title: __('Name'), align: 'left'},
                        {field: 'nickname', title: __('Nickname')},
                        {field: 'flag', title: __('Flag'), operate: false, formatter: Table.api.formatter.flag},
                        {field: 'image', title: __('Image'), operate: false, formatter: Table.api.formatter.image},
                        {field: 'weigh', title: __('Weigh')},
                        {field: 'status', title: __('Status'), operate: false, formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
            ]
        ]
    });
    // 为表格绑定事件
    Table.api.bindevent(table);

    //绑定TAB事件
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // var options = table.bootstrapTable(tableOptions);
        var typeStr = $(this).attr("href").replace('#','');
        var options = table.bootstrapTable('getOptions');
        options.pageNumber = 1;
        options.queryParams = function (params) {
            // params.filter = JSON.stringify({type: typeStr});
            params.type = typeStr;
            return params;
        };
        table.bootstrapTable('refresh', {});
        return false;
    });
}

export function add() {
    api.bindevent()
}

export function edit() {
    api.bindevent()
}