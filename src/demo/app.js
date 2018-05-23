var colData = [
    {
        key: 'name',
        remind: 'the name',
        width: '100px',
        text: '名称',
        sorting: ''
    },{
        key: 'info',
        remind: 'the info',
        text: '使用说明'
    },{
        key: 'url',
        remind: 'the url',
        text: 'url'
    },{
        key: 'createDate',
        remind: 'the createDate',
        width: '100px',
        text: '创建时间',
        sorting: 'DESC',
        template: function(createDate, rowObject){
            return new Date(createDate);
        }
    },{
        key: 'lastDate',
        remind: 'the lastDate',
        width: '100px',
        text: '最后修改时间',
        sorting: '',
        template: function(lastDate, rowObject){
            return new Date(lastDate).toLocaleDateString();
        }
    },{
        key: 'action',
        remind: 'the action',
        width: '100px',
        text: '操作',
        // template: Vue.compile('<span class="plugin-action edit-action" gm-click="app.$options.testGM">删除</span>')
        template: (action, rowObject) => {
            return '<span class="plugin-action edit-action" gm-click="testGM">删除</span>';
        }
    }];

var app = new Vue({
    el: '#app',
    data: {
        option: {
            gridManagerName: "testVue",
            height: "400px",
            columnData: colData,
            supportRemind: true,
            isCombSorting:  true,
            supportAjaxPage: true,
            supportSorting: true,
            ajax_url: "http://www.lovejavascript.com/learnLinkManager/getLearnLinkList",
            ajax_type: "POST",
            query: {pluginId: 1},
            pageSize: 20
        }
    },
    methods: {
        // 测试vue下的GM事件
        testGM: function(row) {
            console.log(row);
        }
    }
});
