import Vue from 'vue';
import 'gridmanager/css/gm.css';
import GridManager from 'gridmanager';

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

        // 包装ajax_success
        const ajax_success = this.option.ajax_success;
        this.option.ajax_success = (respones) => {
            // this.gmData = respones;
            ajax_success && ajax_success.call(_parent, respones);
        };

        // 包装ajax_error
        const ajax_error = this.option.ajax_error;
        this.option.ajax_error = (error) => {
            // this.gmError = error;
            ajax_error && ajax_error.call(_parent, error);
        };

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

        this.$el.GridManager('init', this.option, query => {
            typeof(this.callback) === 'function' && this.callback(query);

            // 当前this指向的是 gridmanager
            // _parent 指向的是调用 gridmanager 的 components
            // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是_parent
            GridManager.setScope(this.$el, _parent);
        });
    },

    /**
     * 消毁事件
     */
    destroyed() {
        const gridManagerName = this.option.gridManagerName;
        // 清除右键菜单
        const menuDomList = document.querySelectorAll(`.grid-menu[grid-master="${gridManagerName}"]`);
        [].forEach.call(menuDomList, menuDom => {
            menuDom.parentNode.removeChild(menuDom);
        });

        // 销毁实例
        GridManager.destroy(gridManagerName);
    }
};

