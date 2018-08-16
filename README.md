# GridManager Vue
> 基于 Vue 的 GridManager 封装, 用于便捷的在 Vue 中使用GridManager. 除过Vue特性外，其它API与GridManager API相同。

[![Build Status](https://travis-ci.org/baukh789/GridManager.svg?branch=master&style=flat-square)](https://travis-ci.org/baukh789/GridManager)
[![npm version](https://img.shields.io/npm/v/gridmanager-vue.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-vue)
[![npm downloads](https://img.shields.io/npm/dt/gridmanager-vue.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-vue)
[![coverage](https://img.shields.io/codecov/c/github/baukh789/GridManager.svg?style=flat-square)](https://codecov.io/gh/baukh789/GridManager)

## API
> 该文档为GridManager的文档，除了`columnData`中存在差异外，其它使用方式相同。
- [API](http://gridmanager.lovejavascript.com/api/index.html)


## Demo
- [带搜索的表格](http://runjs.cn/code/f3ekkv5d)

## Core code
- [GridManager](https://github.com/baukh789/GridManager)
- [jTool](https://github.com/baukh789/jTool)

## 开发环境
ES2015 + webpack + Vue + gridmanager

## 安装
```
npm install gridmanager-vue --save
```

## 使用
### Vue全局组件
```javascript
import GridManager from 'gridmanager-vue';
Vue.use(GridManager);
```

### Vue局部组件
```javascript
import GridManager from 'gridmanager-vue';

new Vue({
    el: '#app',
    components: {
        GridManager
    }
});
```

### 示例
```html
<grid-manager :option="gridOption" ref="grid"></grid-manager>
```

```javascript
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

            // tempalte中使用了vue模块，则必须将参数useCompile配置为true，否则vue模版将不会解析。
            useCompile: true,

            // template=> function: return vue template, 需配置useCompile=true
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
    ajax_data: (settings, params) => {
        return tenantRelateShop(params);
    },

    // 请求失败后事件
    ajax_error: err => {
        console.log(err);
    },

    // checkbox选择事件
    checkedAfter: rowList => {
        this.selectedCheck(rowList);
    },

    // 每页显示条数
    pageSize: 20

    // ...更多配置请参考API
};
```

### 调用公开方法
> GM对象挂在Element.prototype上，这里是通过vue方式获取table dom。无论通过哪种方式，只要获取到table dom就可通过GM函数调用方法。

```javascript
// 刷新
this.$refs['grid'].$el.GM('refreshGrid');

// 更新查询条件
this.$refs['grid'].$el.GM('setQuery', this.searchForm);

// ...其它更多请直接访问API
```

### 查看当前版本

```javascript
import GridManager from 'gridmanager-vue';
console.log('GridManager', GridManager.version);
```
