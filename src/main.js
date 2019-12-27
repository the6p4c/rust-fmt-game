import Vue from 'vue';
import App from './App.vue';

import "normalize.css";

import bestTimeStore from './bestTimeStore.js';
import levels from './levels.js';

Vue.config.productionTip = false;

let initialLevelIdent = null;
if (location.hash != "") {
	initialLevelIdent = location.hash.substring(1);
}

bestTimeStore.init(levels);

const vm = new Vue({
	render: h => h(App),
	data: {
		levels: levels,
		bestTimeStore: bestTimeStore,
		initialLevelIdent: initialLevelIdent,

		formatter: null // Populated after WASM module loads
	}
}).$mount('#app');

import('rust-fmt-game-wasm').then((mod) => {
	vm.$data.formatter = function(spec, params) {
		try {
			const result = mod.format(spec, params);

			const paramsString = params.map((s) => '"' + s + '"').join(', ');
			const formatCall = 'format!("' + spec + '", ' + paramsString + ')';

			return {
				originalSpec: spec,
				originalParams: params,

				formatCall: formatCall,
				result: result
			};
		} catch (e) {
			alert('Something went horribly wrong during formatting (calling into WASM). Here\'s some info: ' + e);
		}
	};
});
