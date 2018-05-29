/**
 * Created by baukh on 18/3/8.
 */
import Vue from 'vue';
import 'gridmanager/css/gm.css';
import GridManager from 'gridmanager';
const VueGM = {
    name: 'grid-manager',
    data: () => {
      return {
          gmData: null,
          gmError: null
      }
    },
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
        console.log('gm-vue mounted');
        const _parent = this.$parent;
        const ajax_success = this.option.ajax_success;
        this.option.ajax_success = (respones) => {
            this.gmData = respones;
            ajax_success && ajax_success.call(_parent, respones);
        };

        const ajax_error = this.option.ajax_error;
        this.option.ajax_error = (error) => {
            this.gmError = error;
            ajax_error && ajax_error.call(_parent, error);
        };

        // 解析Vue 模版
        this.option.compileVue = (compileList) =>  {
            compileList.forEach(item => {
                const td = item.td;
                new Vue({
                    el: td.firstChild,
                    data: {
                        row: item.row
                    },
                    template: td.innerHTML,
                    mounted() {
                        this.onOpenDialog = _parent.onOpenDialog;
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
        console.log('gm-vue beforeCreate');
    },
    created() {
        console.log('gm-vue created');
    },
    updated() {
        // this.$parent.gmData = this.gmData;
        console.log('gm-vue updated');
        this.$nextTick(function () {
            console.log(this.gmData);
        })
    },
    destroyed() {
        console.log('gm-vue destroyed');
    }
    // fn: GridManager
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

