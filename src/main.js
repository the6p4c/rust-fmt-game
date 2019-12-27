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

		// Populated after WASM module loads
		formatter: null,
		formatterLoadError: null
	}
}).$mount('#app');

function paramToString(param) {
	if (typeof param == 'string') {
		return '"' + param + '"';
	}

	if (typeof param == 'number') {
		return '' + param;
	}

	return '???';
}

import('rust-fmt-game-wasm').then((mod) => {
	vm.$data.formatter = function(spec, params) {
		try {
			const result = mod.format(spec, params);

			const paramsString = params.map((param) => paramToString(param)).join(', ');
			const formatCall = 'format!("' + spec + '", ' + paramsString + ')';

			return {
				originalSpec: spec,
				originalParams: params,

				formatCall: formatCall,
				result: result
			};
		} catch (e) {
			alert('Something went horribly wrong during formatting (calling into WASM). Here\'s some info: ' + e + '\nCheck the console for more information. Sorry!');
			// eslint-disable-next-line no-console
			console.error('Error during formatting - spec: "' + spec + '" params:', params, 'error:', e, '');
		}
	};
}).catch((e) => {
	// eslint-disable-next-line no-console
	console.error('Formatter load error', e.stack);
	vm.$data.formatterLoadError = e;
});
