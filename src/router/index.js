import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Only from '../components/GridManager-only';
import I18n from '../components/GridManager-i18n';

Vue.use(Router);

export default new Router({
	mode: 'hash',
	routes: [
		{
		    path: '/',
			redirect: '/Home'
		},
		{
			path: '/Home',
			component: Home
		},
		{
			path: '/Only',
			component: Only
		},
		{
			path: '/I18n',
			component: I18n
		}
	]
});
