import Vue from 'vue';
import $gridManager, { jTool } from 'gridmanager';
import 'gridmanager/css/gm.css';
export { $gridManager, jTool };
export default {
    name: 'GridManagerVue',
    props: {
        option: {
            type: Object,
            default: {},
        },
        callback: {
            type: Function,
            default: query => query,
        }
    },
    template: '<table></table>',
    mounted() {
        const _parent = this.$parent;

        // 解析Vue 模版, data中的row为固定元素
        // compileList格式为[{el: element, row: 行数据}]
        this.option.compileVue = compileList => {
            return new Promise(resolve => {
                compileList.forEach(item => {
                    const el = item.el;
                    const attrList = [];
                    // 递归存储attributes
                    function getAllChildren(childNodes) {
                        childNodes.length > 0 && [].forEach.call(childNodes, ele => {
                            ele.attributes && attrList.push(ele.attributes);
                            ele.childNodes.length > 0 && getAllChildren(ele.childNodes);
                        });
                    }

                    getAllChildren(el.childNodes);

                    // extend methods
                    const methodsMap = {};
                    for (let key in _parent.$options.methods) {
                        methodsMap[key] = _parent.$options.methods[key].bind(_parent);
                    }

                    // extend data
                    const dataMap = {
                        row: item.row,
                        index: item.index
                    };
                    Object.assign(dataMap, _parent.$data);

                    // create new vue
                    new Vue({
                        parent: _parent,
                        el: el,
                        data: () => dataMap,
                        methods: methodsMap,
                        template: el.outerHTML
                    });
                });
                resolve();
            });
        };

        new $gridManager(this.$el, this.option, query => {
            typeof(this.callback) === 'function' && this.callback(query);
        });
    },

    /**
     * 消毁事件
     */
    destroyed() {
        // 销毁实例
        $gridManager.destroy(this.option.gridManagerName);
    }
};

