import Vue from 'vue';
import App from './App.vue';

import "normalize.css";

import levels from './levels.js';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	data: {
		levels: levels
	}
}).$mount('#app');
