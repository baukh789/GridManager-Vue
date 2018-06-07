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
npm install gridmanager-vue
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
        gridManagerName: configs.faq2.label,

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
                template: platId => {
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
        ajax_data: settings => {
            return tenantRelateShop(Object.assign({}, this.searchParams, settings.pageData));
        },

        // 请求失败后事件
        ajax_error: err => {
            const remoteError = err && (err.body && (err.body.internalMessage || err.body.message || err.body.msg));
            remoteError && this.$message.error(remoteError);
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

### 查看当前版本

```javascript
import GridManager from 'gridmanager-vue';
console.log('GridManager', GridManager.version);
```
