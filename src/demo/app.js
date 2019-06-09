import Vue from 'vue';
import './style.css';
import GridManagerVue, { $gridManager } from '../js/index';
// import '../skin/index';

Vue.use(GridManagerVue);
// 模拟的一个promise请求
const getBlogList = function(paramse) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.lovejavascript.com/blogManager/getBlogList');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr.response);
            } else {
                reject(xhr);
            }
        };

        // 一个简单的处理参数的示例
        let formData = '';
        for (let key in paramse) {
            if(formData !== '') {
                formData += '&';
            }
            formData += key + '=' + paramse[key];
        }
        xhr.send(formData);
    });
};

const app = new Vue({
    el: '#app',
    data: {
        // 表单数据
        formData: {
            title: '',
            content: ''
        },

        // 分类
        TYPE_LIST : [
            {value: '1', text: 'HTML/CSS'},
            {value: '2', text: 'nodeJS'},
            {value: '3', text: 'javaScript'},
            {value: '4', text: '前端鸡汤'},
            {value: '5', text: 'PM Coffee'},
            {value: '6', text: '前端框架'},
            {value: '7', text: '前端相关'}
        ],

        // github地址
        github: 'https://github.com/baukh789',

        // 表格渲染回调函数
        // query为gmOptions中配置的query
        callback: function(query) {
            console.log('callback => ', query);
        },

        // 空文本
        emptyText: '这个Vue表格, 什么数据也没有',

        // GM所需参数
        option: {
            supportRemind: true,
            gridManagerName: 'test',
            height: '100%',
            supportAjaxPage: true,
            supportSorting: true,
            isCombSorting: false,
            ajax_data: (settings, parsme) => {
                return getBlogList(parsme);
            },
            ajax_type: 'POST',
            supportMenu: true,
            query: {test: 22},
            pageSize: 30,
            emptyTemplate: '<section style="text-align: center">{{emptyText}}</section>',
            // 顶部通栏
            // topFullColumn: {
            //     template: function(){
            //         return `<div style="padding: 12px; text-align: center;">
            //                     {{row.title}}快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源, <a target="_blank" href="https://github.com/baukh789/GridManager">点击进入</a>github
            //                 </div>`;
            //     }
            // },
            columnData: [
                {
                    key: 'pic',
                    remind: 'the pic',
                    width: '110px',
                    align: 'center',
                    text: '缩略图',
                    // vue template
                    template: `<a target="_blank" style="display:block; height:58.5px;" :href="\'https://www.lovejavascript.com/#!zone/blog/content.html?id=\'+row.id" :title="\'点击阅读[\'+ row.title + \']\'">
                                <img style="width:90px;margin:0 auto;" :src="\'https://www.lovejavascript.com/\'+row.pic" :alt="row.title">
                            </a>`
                }, {
                    key: 'title',
                    remind: 'the title',
                    align: 'left',
                    text: '标题',
                    sorting: '',
                    // 使用函数返回 vue template
                    template: function() {
                        return '<a class="plugin-action" target="_blank" :href="\'https://www.lovejavascript.com/#!zone/blog/content.html?id=\'+ row.id" :title="\'点击阅读[\'+ row.title +\']\'">{{row.title}}</a>';
                    }
                }, {
                    key: 'type',
                    text: '博文分类',
                    width: '150px',
                    align: 'center',
                    // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
                    filter: {
                        // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                        option: [
                            {value: '1', text: 'HTML/CSS'},
                            {value: '2', text: 'nodeJS'},
                            {value: '3', text: 'javaScript'},
                            {value: '4', text: '前端鸡汤'},
                            {value: '5', text: 'PM Coffee'},
                            {value: '6', text: '前端框架'},
                            {value: '7', text: '前端相关'}
                        ],

                        // 筛选选中项，字符串, 未存在选中项时设置为''。 在此设置的选中的过滤条件将会覆盖query
                        selected: '3',

                        // 否为多选, 布尔值, 默认为false。非必设项
                        isMultiple: false
                    },
                    // 使用v-for、v-bind及简写形式
                    template: '<select><option v-for="item in TYPE_LIST" v-bind:value="item.value" :selected="item.value === row.type.toString()">{{item.text}}</option></select>'
                }, {
                    key: 'info',
                    text: '简介',
                    width: '300px'
                }, {
                    key: 'username',
                    remind: 'the username',
                    width: '100px',
                    align: 'center',
                    text: '作者',
                    template: `<a class="plugin-action" v-bind:href="github" target="_blank" :title="\'去看看的\'+ row.username + \'github\'">{{row.username}}</a>`
                }, {
                    key: 'createDate',
                    remind: 'the createDate',
                    width: '130px',
                    text: '创建时间',
                    sorting: 'DESC',
                    // 使用函数返回 htmlString
                    template: function (createDate, rowObject) {
                        return new Date(createDate).toLocaleDateString();
                    }
                }, {
                    key: 'lastDate',
                    remind: 'the lastDate',
                    width: '130px',
                    text: '最后修改时间',
                    sorting: '',
                    // 使用函数返回 htmlString
                    template: function (lastDate, rowObject) {
                        return new Date(lastDate).toLocaleDateString();
                    }
                }, {
                    key: 'action',
                    remind: 'the action',
                    align: 'center',
                    width: '100px',
                    disableCustomize: true,
                    text: '<span style="color: red;" @click="actionAlert()">操作</span>',
                    // 使用@click
                    template: () => {
                        return '<span class="plugin-action" @click="delectRow(row, index)">删除</span>';
                    }
                }
            ],
            // 排序后事件
            sortingAfter: function (data) {
                console.log('sortAfter', data);
            }
        }
    },
    methods: {
        // 测试vue下的GM事件
        delectRow: function (row, index) {
            if(window.confirm(`确认要删除当前页第[${index}]条的['${row.title}]?`)){
                console.log('----删除操作开始----');
                this.$refs['grid'].$el.GM('refreshGrid');
                console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
                console.log('----删除操作完成----');
                console.log('');
            }
        },
        // 事件: 操作
        actionAlert: function() {
            alert('操作栏th是由vue模板渲染的');
        },
        // 事件: 搜索
        onSearch() {
            var params = Object.assign({cPage: 1}, this.formData);
            $gridManager.setQuery('test', params, function () {
                console.log('setQuery=>执行成功222');
            });
        },

        // 事件: 重置
        onReset: function () {
            this.formData.title = '';
            this.formData.content = '';
        },

        // 事件: 初始化
        onInit: function () {
            this.destroyDisabled = false;
        },

        // 事件: 销毁
        onDestroy: function () {
            this.destroyDisabled = true;
        }
    },

    // 创建完成
    created: function () {
        this.destroyDisabled = false;
    }
});
