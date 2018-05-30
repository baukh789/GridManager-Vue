/**
 * Created by baukh on 18/3/8.
 */
import Vue from 'vue';
import 'gridmanager/css/gm.css';
import GridManager from 'gridmanager';
const VueGM = {
    name: 'grid-manager',
    // data: () => {
    //     return {
    //         gmData: null,
    //         gmError: null
    //     }
    // },
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
        // compileList格式为[{th: td element, row: 行数据}]
        this.option.compileVue = (compileList) =>  {
            compileList.forEach(item => {
                const td = item.td;
                const attributes = td.firstChild.attributes;
                new Vue({
                    el: td.firstChild,
                    data: () => {
                        const map = {
                            row: item.row
                        };
                        [].forEach.call(attributes, attr => {
                            // 当前属性异常或非Vue特定属性
                            if (!attr.name || !attr.value || !/:|@/g.test(attr.name)) {
                                return;
                            }

                            // 当前属性为函数
                            if (attr.value.indexOf('(') !== -1) {
                                return;
                            }

                            // 特定属性不允许变更
                            if (attrName === 'row') {
                                console.warn('GridManager warn: Vue attribute row can not be defined!');
                                return;
                            }
                            map[attr.value] = _parent[attr.value];
                            map[attrName] = _parent[attr.value];
                        });
                        return map;
                    },
                    template: td.innerHTML,
                    mounted() {
                        // 改变Vue特性属性所使用的域
                        [].forEach.call(attributes, attr => {
                            // 当前属性异常或非Vue特定属性
                            if (!attr.name || !attr.value || !/:|@/g.test(attr.name)) {
                                return;
                            }

                            // 当前属性为函数
                            if (attr.value.indexOf('(') !== -1) {
                                const attrSplit = attr.value.split('(');
                                const fnName = attrSplit[0];
                                this[fnName] = _parent[fnName];
                            }
                        });
                    }
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
};

// 支持Vue.use()进行全局注册
VueGM.install = (Vue, opts = {}) => {
    Vue.component('grid-manager', VueGM);
};

// es5 + script直接使用的方式: 将gm直接挂载为Vue全局组件
if (typeof window !== 'undefined' && window.Vue) {
    VueGM.install(window.Vue);
}

// 在项目中引用后，无有效的输出
export default VueGM;

