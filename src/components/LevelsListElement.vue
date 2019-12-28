<template>
<div class="level" v-bind:class="{ 'level-current': isCurrent }">
	<span class="level-name">{{ index + 1 }}. {{ level.name }}</span>
	<span v-if="bestTime" class="best-time" v-bind:title="'Best time: ' + bestTimeHoverString">{{ bestTimeString }}</span>
	<span v-else class="best-time" title="No best time yet">&mdash;</span>
</div>
</template>

<script>
export default {
	name: 'LevelsListElement',
	props: {
		index: Number,
		level: Object,
		bestTime: Number, // time in seconds, or null
		isCurrent: Boolean
	},
	computed: {
		bestTimeMinutes: function() {
			return Math.floor(this.bestTime / 60);
		},
		bestTimeSeconds: function() {
			return this.bestTime % 60;
		},
		bestTimeHoverString: function() {
			const minutesString = '' + this.bestTimeMinutes;
			const secondsString = '' + this.bestTimeSeconds;

			const minutePlural = this.bestTimeMinutes == 1 ? '' : 's';
			const secondPlural = this.bestTimeSeconds == 1 ? '' : 's';

			return minutesString + ' minute' + minutePlural + ', ' + secondsString + ' second' + secondPlural;
		},
		bestTimeString: function() {
			const minutesString = ('' + this.bestTimeMinutes).padStart(2, '0');
			const secondsString = ('' + this.bestTimeSeconds).padStart(2, '0');

			return minutesString + ':' + secondsString;
		}
	}
};
</script>

<style scoped>
.level {
	padding: 10px;

	border-top: 1px solid #999;

	cursor: pointer;
}

.level:last-child {
	border-bottom: 1px solid #999;
}

.level:hover {
	background-color: #eee;
}

.level-current {
	font-weight: bold;
}

.best-time {
	float: right;
}
</style>
