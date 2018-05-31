/**
 * Created by baukh on 18/3/8.
 */
import GridManagerVue from './gridmanager-vue';

// Vue install, Vue.use 会调用该方法。
GridManagerVue.install = (Vue, opts = {}) => {
    Vue.component('grid-manager', GridManagerVue);
};

// 通过script标签引入Vue的环境
if (typeof window !== 'undefined' && window.Vue) {
    GridManagerVue.install(window.Vue);
}

// GridManagerVue 的版本号。 需要注意的是: 这仅仅是vue环境的壳, 验证功能需要查看GridManager的版本号
GridManagerVue.version = '0.1.3';

export default GridManagerVue;

