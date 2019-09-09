# GridManager Vue
> 基于 Vue 的 GridManager 封装, 用于便捷的在 Vue 中使用GridManager. 除过Vue特性外，其它API与GridManager API相同。

![image](https://s2.ax1x.com/2019/04/16/AxA4xK.png)
[![Build Status](https://travis-ci.org/baukh789/GridManager.svg?branch=master&style=flat-square)](https://travis-ci.org/baukh789/GridManager)
[![npm version](https://img.shields.io/npm/v/gridmanager-vue.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-vue)
[![npm downloads](https://img.shields.io/npm/dt/gridmanager-vue.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-vue)
[![coverage](https://img.shields.io/codecov/c/github/baukh789/GridManager.svg?style=flat-square)](https://codecov.io/gh/baukh789/GridManager)

## 实现功能
| 功能 | 描述 |
| -: | :- |
| 宽度调整 | 表格的列宽度可进行拖拽式调整 |
| 位置更换 | 表格的列位置进行拖拽式调整 |
| 配置列 | 可通过配置对列进行显示隐藏转换 |
| 表头吸顶 | 在表存在可视区域的情况下,表头将一直存在于顶部 |
| 排序 | 表格单项排序或组合排序 |
| 分页 | 表格ajax分页,包含选择每页显示总条数和跳转至指定页功能 |
| 用户偏好记忆 | 记住用户行为,含用户调整的列宽、列顺序、列可视状态及每页显示条数 |
| 序号 | 自动生成序号列 |
| 全选 | 自动生成全选列 |
| 导出 | 当前页数据下载,和仅针对已选中的表格下载 |
| 右键菜单 | 常用功能在菜单中可进行快捷操作 |
| 过滤 | 通过对列进行过滤达到快速搜索效果 |
| 合并 | 同一列下相同值的单元格可自动合并 |
| 树表格 | 可通过配置快速实现树型表格结构 |

## API
> 该文档为原生GridManager的文档，vue版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用vue模版外，其它使用方式相同。
- [API](http://gridmanager.lovejavascript.com/api/index.html)

## Demo
> 该示例为原生GridManager的示例，vue版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用vue模版外，其它使用方式相同。
- [简单的示例](http://gridmanager.lovejavascript.com/demo/index.html)
- [复杂的示例](http://develop.lovejavascript.com/node_modules/gridmanager/demo/index.html)

## Core code
- [GridManager](https://github.com/baukh789/GridManager)
- [jTool](https://github.com/baukh789/jTool)

## 开发环境
ES2015 + webpack + Vue + GridManager

## 安装
```
npm install gridmanager-vue --save
```

## 项目中引用
- es2015引入方式
```javascript
import GridManagerReact, {$gridManager} from 'gridmanager-react';
import 'gridmanager-react/css/gm-react.css';
```

- 通过script标签引入
```html
<link rel="stylesheet" href="../node_modules/gridmanager-react/css/gm-react.css">
<script src="../node_modules/gridmanager-react/js/gm-react.js"></script>
```
### Vue全局组件
```javascript
import GridManagerVue from 'gridmanager-vue';
import 'gridmanager-vue/css/gm-vue.css';
Vue.use(GridManagerVue);
```

### Vue局部组件
```javascript
import GridManagerVue from 'gridmanager-vue';
import 'gridmanager-vue/css/gm-vue.css';

new Vue({
    el: '#app',
    components: {
        GridManagerVue
    }
});
```

### 示例
```html
<grid-manager :option="gridOption" :callback="callback" ref="grid"></grid-manager>
```

```javascript

const app = new Vue({
    el: '#app',
    data: {
        // 表格渲染回调函数
        // query为gmOptions中配置的query
        callback: function(query) {
            console.log('callback => ', query);
        },

        // 表格
        gridOption = {
            // 表格唯一标识
            gridManagerName: 'test-gm',

            // 高度
            height: '300px',

            // 首次是否加载
            firstLoading: false,

            // 列配置
            columnData: [
                {
                    key: 'shopId',
                    width: '180px',
                    text: '店铺id',
                    align: 'center'
                },{
                    key: 'platId',
                    text: '平台',

                    // template=> function: return dom
                    // 参数介绍
                    // platId: 当前行数据中与配置项key相同字段的值
                    // row: 当前行数据
                    // index: 当前行所在数据中的索引值
                    template: (platId, row, index) => {
                        const span = document.createElement('span');
                        span.style.color = 'blue';
                        span.innerText = platId;
                        return span;
                    }
                },{
                    key: 'platNick',
                    text: '店铺名称',

                    // template=> string dom
                    template: `<span style="color: red">跟据相关法规，该单元格被过滤</span>`
                },{
                    key: 'createTime',
                    text: '创建时间',
                },{
                    key: 'updateTime',
                    text: '更新时间',

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
                        // 筛选选中项，字符串, 默认为''。 非必设项，选中的过滤条件将会覆盖query
                        selected: '3',
                        // 否为多选, 布尔值, 默认为false。非必设项
                        isMultiple: false
                    },
                    // template=> function: return string dom
                    template: updateTime => {
                        return `<span style="color: blue">${updateTime}</span>`;
                    }
                },{
                    key: 'action',
                    text: '操作',
                    width: '100px',
                    align: 'center',

                    // template=> function: return vue template
                    // vue模版中将自动添加row字段，该字段为当前行所使用的数据
                    // vue模版将不允许再使用template函数中传入的参数
                    template:() => {
                        return '<el-button size="mini" type="danger" @click="delRelation(row)">解除绑定</el-button>';
                    }
                }
            ],
            // 使用分页
            supportAjaxPage: true,

            // 数据来源，类型: string url || data || function return[promise || string url || data]
            ajaxData: (settings, params) => {
                return tenantRelateShop(params);
            },

            // 请求失败后事件
            ajaxError: err => {
                console.log(err);
            },

            // checkbox选择事件
            checkedAfter: rowList => {
                this.selectedCheck(rowList);
            },

            // 每页显示条数
            pageSize: 20

            // ...更多配置请参考API
        }
    },
    methods: {
        // 解除绑定
        delRelation: function(row) {
            // ... 解除绑定操作
        }
    }
});
```

### vue-class-component
使用`vue-class-component`时，`GridManager`中所使用的this指向class，而非Vue.
如果需要将this指向vue, 可以通过将`GridManager`的配置项写在created内来实现。

### 调用公开方法
> 通过ES6语法，将$gridManager引入。如果使用`this.$gridManager`服务需要提前通过`Vue.use(GridManagerVue)`将`GridManagerVue`注册至全局组件。

```javascript
import GridManagerVue, { $gridManager } from 'gridmanager-vue';
Vue.use(GridManagerVue);
// 刷新
$gridManager.refreshGrid('test-gm');  // 或 this.$gridManager.refreshGrid('test-gm');

// 更新查询条件
$gridManager.setQuery('test-gm', {name: 'baukh'});  // 或 this.$gridManager.setQuery('test-gm', {name: 'baukh'});

// ...其它更多请直接访问API
```

### 查看当前版本

```javascript
import GridManagerVue, {$gridManager} from 'gridmanager-vue';
console.log('GridManagerVue 的版本=>', GridManagerVue.version);
console.log('GridManager 的版本=>', $gridManager.version);
```
