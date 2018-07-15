import Vue from 'vue';
import './style.css';
import GridManager from '../js/index';

Vue.use(GridManager);

const TYPE_MAP = {
    '1': 'HTML/CSS',
    '2': 'nodeJS',
    '3': 'javaScript',
    '4': '前端鸡汤',
    '5': 'PM Coffee',
    '6': '前端框架',
    '7': '前端相关'
};

const app = new Vue({
    el: '#app',
    data: {
        // 表单数据
        formData: {
            name: '',
            info: '',
            url: ''
        },

        // 初始化按纽禁用标识
        initDisabled: true,

        // 销毁按纽禁用标识
        destroyDisabled: true,

        // GM所需参数
        option: {
            supportRemind: true
            , gridManagerName: 'test'
            , height: '400px'
            , supportAjaxPage: true
            , supportSorting: true
            , isCombSorting: false
            , disableCache: false
            , ajax_data: 'http://www.lovejavascript.com/blogManager/getBlogList'
            , ajax_type: 'POST'
            , supportMenu: true
            , query: {test: 22}
            , pageSize: 30
            , columnData: [
                {
                    key: 'pic',
                    remind: 'the pic',
                    width: '110px',
                    align: 'center',
                    text: '缩略图',
                    // 使用函数返回 dom node
                    template: function (pic, rowObject) {
                        var picNode = document.createElement('a');
                        picNode.setAttribute('href', `http://www.lovejavascript.com/#!zone/blog/content.html?id=${rowObject.id}`);
                        picNode.setAttribute('title', rowObject.title);
                        picNode.setAttribute('target', '_blank');
                        picNode.title = `点击阅读[${rowObject.title}]`;
                        picNode.style.display = 'block';
                        picNode.style.height = '68.5px';

                        var imgNode = document.createElement('img');
                        imgNode.style.width = '100px';
                        imgNode.style.padding = '5px';
                        imgNode.style.margin = '0 auto';
                        imgNode.alt = rowObject.title;
                        imgNode.src = `http://www.lovejavascript.com/${pic}`;

                        picNode.appendChild(imgNode);
                        return picNode;
                    }
                }, {
                    key: 'title',
                    remind: 'the title',
                    width: '300px',
                    align: 'left',
                    text: '标题',
                    sorting: '',
                    // 使用函数返回 dom node
                    template: function (title, rowObject) {
                        var titleNode = document.createElement('a');
                        titleNode.setAttribute('href', `http://www.lovejavascript.com/#!zone/blog/content.html?id=${rowObject.id}`);
                        titleNode.setAttribute('title', title);
                        titleNode.setAttribute('target', '_blank');
                        titleNode.innerText = title;
                        titleNode.title = `点击阅读[${rowObject.title}]`;
                        titleNode.classList.add('plugin-action');

                        return titleNode;
                    }
                }, {
                    key: 'type',
                    text: '博文分类',
                    width: '100',
                    align: 'center',
                    filter: {
                        option: [
                            {value: '1', text: 'HTML/CSS'},
                            {value: '2', text: 'nodeJS'},
                            {value: '3', text: 'javaScript'},
                            {value: '4', text: '前端鸡汤'},
                            {value: '5', text: 'PM Coffee'},
                            {value: '6', text: '前端框架'},
                            {value: '7', text: '前端相关'}
                        ],
                        // 选中的过滤条件将会覆盖query
                        selected: '3',
                        isMultiple: false
                    },
                    template: function (type, rowObject) {
                        // TODO 这里应该支持直接使用文本
                        return `<span>${TYPE_MAP[type]}</span>`;
                    }
                }, {
                    key: 'info',
                    text: '简介',
                    isShow: false
                }, {
                    key: 'username',
                    remind: 'the username',
                    width: '100px',
                    align: 'center',
                    text: '作者',
                    template: function (username) {
                        return `<a class="plugin-action" href="https://github.com/baukh789" target="_blank" title="去看看${username}的github">${username}</a>`;
                    }
                }, {
                    key: 'createDate',
                    remind: 'the createDate',
                    width: '100px',
                    text: '创建时间',
                    sorting: 'DESC',
                    // 使用函数返回 htmlString
                    template: function (createDate, rowObject) {
                        return new Date(createDate).toLocaleDateString();
                    }
                }, {
                    key: 'lastDate',
                    remind: 'the lastDate',
                    width: '100px',
                    text: '最后修改时间',
                    sorting: '',
                    // 使用函数返回 htmlString
                    template: function (lastDate, rowObject) {
                        return new Date(lastDate).toLocaleDateString();
                    }
                }, {
                    key: 'action',
                    remind: 'the action',
                    width: '10%',
                    align: 'center',
                    text: '<span style="color: red">操作</span>',
                    useCompile: true,
                    // 直接返回 htmlString
                    template: () => {
                        return '<span class="plugin-action" @click="delectRow(row)">删除</span>';
                    }
                }
            ]
            // 排序后事件
            , sortingAfter: function (data) {
                console.log('sortAfter', data);
            }
        }
    },
    methods: {
        // 测试vue下的GM事件
        delectRow: function (row) {
            if (window.confirm('确认要删除[' + row.title + ']?')) {
                console.log('----删除操作开始----');
                this.$refs['grid'].$el.GM('refreshGrid');
                console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
                console.log('----删除操作完成----');
                console.log('');
            }
        },

        // 事件: 搜索
        onSearch: function () {
            var params = Object.assign({cPage: 1}, this.formData);
            this.$refs['grid'].$el.GM('setQuery', params, function () {
                console.log('setQuery执行成功');
            });
        },

        // 事件: 重置
        onReset: function () {
            this.formData.name = '';
            this.formData.info = '';
            this.formData.url = '';
        },

        // 事件: 初始化
        onInit: function () {
            this.$refs['grid'].$el.GM('init', this.option);
            this.initDisabled = true;
            this.destroyDisabled = false;
        },

        // 事件: 销毁
        onDestroy: function () {
            this.$refs['grid'].$el.GM('destroy');
            this.initDisabled = false;
            this.destroyDisabled = true;
        }
    },

    // 创建完成
    created: function () {
        this.initDisabled = true;
        this.destroyDisabled = false;
    }
});
