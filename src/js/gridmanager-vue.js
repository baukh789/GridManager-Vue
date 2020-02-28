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
        const methods = _parent.$options.methods;

        // 存储Vue实例
        let vueCache = [];

        // 更新Vue存储实例
        const updateVueCache = () => {
            vueCache = vueCache.filter(vm => {
                const { $el } = vm;
                if (!window.getComputedStyle($el).display) {
                    // 清除framework.send 后存在操作的DOM节点
                    const tree = $el.querySelector('[tree-element]');
                    tree && $el.removeChild(tree);

                    vm.$destroy();
                }
                return !!window.getComputedStyle($el).display;
            });
        };

        // 包装ajaxSuccess
        const ajaxSuccess = this.option.ajaxSuccess;
        this.option.ajaxSuccess = (respones) => {
            // this.gmData = respones;
            ajaxSuccess && ajaxSuccess.call(_parent, respones);
        };

        // 包装ajax_error
        const ajaxError = this.option.ajaxError;
        this.option.ajaxError = (error) => {
            // this.gmError = error;
            ajaxError && ajaxError.call(_parent, error);
        };

        // 解析Vue 模版, data中的row为固定元素
        // compileList格式为[{el: element, row: 行数据}]
        this.option.compileVue = compileList => {
            let attributes = null;
            let children = null;
            updateVueCache();
            return new Promise(resolve => {
                compileList.forEach(item => {
                    const el = item.el;
                    const attrList = [];
                    // 递归存储attributes
                    function getAllChildren(childNodes) {
                        childNodes.length > 0 && [].forEach.call(childNodes, ele => {
                            attributes = ele.attributes;
                            children = ele.childNodes;
                            attributes && attrList.push(attributes);
                            children.length > 0 && getAllChildren(children);
                        });
                    }

                    getAllChildren(el.childNodes);

                    // extend methods
                    const methodsMap = {};
                    for (let key in methods) {
                        methodsMap[key] = methods[key].bind(_parent);
                    }

                    // extend data
                    const dataMap = {
                        row: item.row,
                        index: item.index
                    };
                    Object.assign(dataMap, _parent.$data);

                    // create new vue
                    vueCache.push(new Vue({
                        parent: _parent,
                        el: el,
                        data: () => dataMap,
                        methods: methodsMap,
                        template: el.outerHTML
                    }));
                });
                resolve();
            });
        };

        new $gridManager(this.$el, this.option, query => {
            typeof(this.callback) === 'function' && this.callback(query);

            // 当前this指向的是 gridmanager
            // _parent 指向的是调用 gridmanager 的 components
            // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是_parent
            $gridManager.setScope(this.$el, _parent);
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
        $gridManager.destroy(gridManagerName);
    }
};

