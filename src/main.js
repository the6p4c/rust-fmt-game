import Vue from 'vue';
import App from './App.vue';

import "normalize.css";

import levels from './levels.js';

Vue.config.productionTip = false;

let initialLevelIdent = null;
if (location.hash != "") {
	initialLevelIdent = location.hash.substring(1);
}

const bestTimeStore = {
	bestTimes: {}
};

// Pre-populate store with previous best times
for (var i = 0; i < levels.length; ++i) {
	const ident = levels[i].ident;

	bestTimeStore.bestTimes[ident] = null;

	if (window.localStorage) {
		const bestTime = window.localStorage.getItem(ident);
		if (bestTime != null && /^[0-9]$/.test(bestTime)) {
			bestTimeStore.bestTimes[ident] = Number(bestTime);
		}
	}
}

// Returns the stored best time for the provided level (by ident), or null if no
// best time exists yet.
bestTimeStore.getBestTime = (ident) => {
	// Because we populated above, we're guaranteed to have an entry for each
	// level, and we stored null if there wasn't a saved one.
	return bestTimeStore.bestTimes[ident];
};

// Sets the best time for the provided level (by ident) if the new time is
// faster or no best time has been recorded yet.
bestTimeStore.trySetBestTime = (ident, time) => {
	const prevBestTime = bestTimeStore.getBestTime(ident);
	const needsUpdate = prevBestTime == null || prevBestTime > time;

	if (needsUpdate) {
		bestTimeStore.bestTimes[ident] = time;

		if (window.localStorage) {
			window.localStorage.setItem(ident, '' + time);
		}
	}
};

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
