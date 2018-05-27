/**
 * Created by baukh on 18/3/8.
 */
import 'gridmanager/css/gm.css';
import GridManager from 'gridmanager';
const component = {
    props: ['option'],
    template: '<table></table>',
    mounted: function () {
        this.$el.GridManager('init', this.option);

        // 当前this指向的是 gridmanager
        // this.$parent 指向的是调用 gridmanager 的 components
        // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是this.$parent
        GridManager.setScope(this.$el, this.$parent);
    }
};
const install = (Vue, opts = {}) => {
    Vue.component('grid-manager', component);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

// 在项目中引用后，无有效的输出
export default install;

