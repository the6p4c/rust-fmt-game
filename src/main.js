import Vue from 'vue';
import App from './App.vue';

import "normalize.css";

import levels from './levels.js';

Vue.config.productionTip = false;

let initialLevelIdent = null;
if (location.hash != "") {
	initialLevelIdent = location.hash.substring(1);
}

new Vue({
	render: h => h(App),
	data: {
		levels: levels,
		initialLevelIdent: initialLevelIdent
	}
}).$mount('#app');
