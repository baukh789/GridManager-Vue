import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import GridManager from '../components/GridManager';

Vue.use(Router);

export default new Router({
	mode: 'hash',
	routes: [
		{
		    path: '/',
			redirect: '/HelloWorld'
		},
		{
			path: '/HelloWorld',
			component: HelloWorld
		},
		{
			path: '/GridManager',
			component: GridManager
		}
	]
});
