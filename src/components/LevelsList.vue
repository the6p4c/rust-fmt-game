<template>
<section>
	<h2>Levels</h2>
	<LevelsListElement
		v-for="(level, index) in levels" v-bind:key="level.ident"
		v-bind:index="index" v-bind:level="level"
		v-bind:best-time="getBestTime(level)" v-bind:is-current="level.ident == currentLevelIdent" />
</section>
</template>

<script>
import LevelsListElement from './LevelsListElement.vue';

export default {
	name: 'LevelsList',
	components: {
		LevelsListElement
	},
	props: {
		levels: Array,
		bestTimes: Object, // level ident -> Number? map, time in seconds
		currentLevelIdent: String
	},
	methods: {
		// Retrieve the player's best time for the level, or null if no best
		// time has been recorded.
		getBestTime: function(level) {
			if (this.bestTimes.hasOwnProperty(level.ident)) {
				return this.bestTimes[level.ident];
			} else {
				return null;
			}
		}
	}
};
</script>
