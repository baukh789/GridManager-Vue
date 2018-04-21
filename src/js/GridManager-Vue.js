import Vue from 'vue';
import '../../node_modules/gridmanager/js/gm.js';
import '../../node_modules/gridmanager/css/gm.css';

Vue.component('grid-manager', Vue.extend({
	template: '<table></table>',
	props: ['option'],
	mounted: function(){
		const table = this.$el;
		table && table.GM && table.GM(this.option);
	}
}));