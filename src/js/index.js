/**
 * Created by baukh on 18/3/8.
 */
import '../../node_modules/gridmanager/css/gm.css';
import '../../node_modules/gridmanager/js/gm.js';

Vue.component('gridManager', {
        props: ['option'],
        template: '<table></table>',
        mounted: function () {
            this.$el.GM('init', this.option);

            // 当前this指向的是 gridmanager
            // this.$parent 指向的是调用 gridmanager 的 components
            // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是this.$parent
            GM.setScope(this.$el, this.$parent);
        }
    }
);
