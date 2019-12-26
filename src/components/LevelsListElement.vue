<template>
<div class="level" v-bind:class="{ 'level-current': isCurrent }">
	<span class="level-name">{{ index + 1 }}. {{ level.name }}</span>
	<span v-if="bestTime" class="best-time" v-bind:title="'Best time: ' + bestTimeString">{{ bestTimeString }}</span>
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
		bestTimeString: function() {
			const minutes = Math.floor(this.bestTime / 60);
			const seconds = this.bestTime % 60;

			const minutesString = ('' + minutes).padStart(2, '0');
			const secondsString = ('' + seconds).padStart(2, '0');

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
