<template>
<section>
	<h2>Levels</h2>
	<LevelsListElement
		v-for="(level, index) in levels" v-bind:key="level.ident"
		@click.native="levelClick(index)"
		v-bind:index="index" v-bind:level="level"
		v-bind:best-time="bestTimeStore.bestTimes[level.ident]" v-bind:is-current="level.ident == currentLevelIdent" />
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
		bestTimeStore: Object,
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
		},
		levelClick: function(index) {
			this.$emit('level-click', index);
		}
	}
};
</script>
