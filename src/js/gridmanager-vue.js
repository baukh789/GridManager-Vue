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
        this.option.compileVue = (compileList) => {
            compileList.forEach(item => {
                const el = item.el;
                // 无效的解析对象
                if (el.firstChild.nodeType !== 1) {
                    return;
                }
                const attrList = [];

                // 递归存储attributes
                function getAllChildren(childNodes) {
                    childNodes.length > 0 && [].forEach.call(childNodes, ele => {
                        ele.attributes && attrList.push(ele.attributes);
                        ele.childNodes.length > 0 && getAllChildren(ele.childNodes);
                    });
                }

                getAllChildren(el.childNodes);


                // vue data
                const dataMap = {
                    row: item.row
                };

                // v-model
                const watchMap = {};

                attrList.forEach(attributes => {
                    [].forEach.call(attributes, attr => {
                        // 属性名或属性值为空将跳出:
                        if (!attr.name || !attr.value) {
                            return;
                        }

                        // 属性名不满足以下形式将跳出:
                        // 非v-model
                        // 非bind或bind的简写形式
                        // 非on或on的简写形式
                        if (attr.name !== 'v-model'
                            && attr.name !== 'v-bind' && !/:/g.test(attr.name)
                            && attr.name !== 'v-on' && !/@/g.test(attr.name)) {
                            return;
                        }

                        // 特定属性不允许变更
                        if (attr.name === 'row') {
                            console.warn('GridManager warn: Vue attribute row can not be defined!');
                            return;
                        }

                        // 双向绑定, 监听数据
                        if (attr.name === 'v-model') {
                            watchMap[attr.value] = (newValue, oldValue) => {
                                _parent[attr.value] = newValue;
                            };
                        }

                        // 整理data 中即将存储的 key名称
                        let dataKey = null;

                        // 特殊处理: 包含()的函数。这种函数不需要将其value值赋于data
                        // ex: @click="openDialog(row)"
                        if (attr.value.indexOf('(') !== -1) {
                            dataKey = attr.value.split('(')[0];
                        }
                        // ex: @click="openDialog"
                        else if (typeof attr.value === 'function') {
                            dataKey = attr.value;
                        }
                        // ex: v-model="currentInfo"
                        else if (attr.name === 'v-model') {
                            dataKey = attr.value;
                        }

                        // ex: v-bind:info="currentInfo"
                        // ex: :info="currentInfo"
                        else if (attr.name.split(':')[1]) {
                            dataKey = attr.value;
                        }

                        // 父域中并不存在时跳出
                        if (typeof _parent[dataKey] === 'undefined') {
                            return;
                        }

                        // 为data进行赋值
                        dataMap[dataKey] = _parent[dataKey];
                    });
                });
                new Vue({
                    el: el.firstChild,
                    data: () => dataMap,
                    watch: watchMap,
                    template: el.innerHTML
                });
            });
        };

        this.$el.GridManager('init', this.option, query => {
            this.callback(query);

            // 当前this指向的是 gridmanager
            // _parent 指向的是调用 gridmanager 的 components
            // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是_parent
            GridManager.setScope(this.$el, _parent);
        });
    },

    beforeCreate() {
    },
    created() {
    },
    updated() {
    },
    destroyed() {
        // 清除右键菜单
        const menuDomList = document.querySelectorAll('.grid-menu[grid-master]');
        [].forEach.call(menuDomList, menuDom => {
            menuDom.parentNode.removeChild(menuDom);
        });
    }
}
