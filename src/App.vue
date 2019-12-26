<template>
	<div id="app">
		<h1 id="header">Rust <code>format!</code> Game</h1>
		<LevelsList
			id="levels-list"
			@level-click="changeLevel"
			v-bind:levels="levels" v-bind:best-time-store="bestTimeStore" v-bind:current-level-ident="currentLevel.ident" />
		<Game
			id="game" ref="game"
			@finish-level="finishLevel" @next-level="nextLevel"
			v-bind:level-index="currentLevelIndex" v-bind:level="currentLevel" v-bind:has-next-level="!isLastLevel" />
		<!-- &#xFE0F is the character VS16 (variation selector 16) - forces heart to be an emoji, not just a black blob -->
		<footer id="footer">made with ❤&#xFE0F; by <a href="https://twitter.com/The6P4C">@The6P4C</a> / <a href="https://the6p4c.github.io/">the6p4c.github.io</a></footer>
	</div>
</template>

<script>
import LevelsList from './components/LevelsList.vue';
import Game from './components/Game.vue';

export default {
	name: 'app',
	components: {
		LevelsList,
		Game
	},
	data: function() {
		return {
			currentLevelIndex: 0 // May be updated in mounted
		};
	},
	computed: {
		levels: function() {
			return this.$root.$data.levels;
		},
		bestTimeStore: function() {
			return this.$root.$data.bestTimeStore;
		},
		currentLevel: function() {
			return this.levels[this.currentLevelIndex];
		},
		isLastLevel: function() {
			return this.currentLevelIndex == this.levels.length - 1;
		}
	},
	methods: {
		changeLevel: function(index) {
			// User has selected the same level again.
			// Convenience and user expectation is that the level would reset,
			// but this only happens if the index actually changes and the prop
			// watches trigger.
			// So, force the game to reset.
			if (this.currentLevelIndex == index) {
				this.$refs.game.reset();
			}

			this.currentLevelIndex = index;
		},
		finishLevel: function(time) {
			this.bestTimeStore.trySetBestTime(this.currentLevel.ident, time);
		},
		nextLevel: function() {
			if (this.currentLevelIndex != this.levels.length - 1) {
				++this.currentLevelIndex;
			}
		}
	},
	mounted: function() {
		const initialLevelIdent = this.$root.$data.initialLevelIdent;
		if (initialLevelIdent == null) {
			// Safe - current level index already initialized to 0
			return;
		}

		// Find the level with the matching ident
		for (var i = 0; i < this.levels.length; ++i) {
			if (this.levels[i].ident == initialLevelIdent) {
				this.currentLevelIndex = i;
			}
		}
	}
};
</script>

<style>
html, body {
	width: 100%;
	height: 100%;
}

body {
	font-family: "Open Sans", sans-serif;
}

/*
	0px to 800px
		App container width 100%, height 100%
		Game only, levels list hidden
	800px to 1200px
		App container width 100%, height 800px,
		Game and levels visible
	1200px to infinity
		App container width 1200px, height 800px
		Game and levels visible
*/

#app {
	display: grid;

	width: 100%;
	height: 100%;
	margin: 0 auto;

	grid-template-columns: 100%;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		"header"
		"game"
		"footer";
}

@media (min-width: 800px) {
	#app {
		grid-template-columns: 200px auto;
		grid-template-areas:
			"header header"
			"levels-nav game"
			"footer footer";
	}
}

@media (min-width: 1200px) {
	#app {
		width: 1200px;
	}
}

@media (min-height: 800px) {
	#app {
		height: 800px;
	}
}

#header {
	grid-area: header;

	text-align: center;
}

#levels-list {
	display: none;
	padding: 10px;

	overflow-y: auto;
}

@media (min-width: 800px) {
	#levels-list {
		display: initial;

		grid-area: levels-nav;
	}
}

#levels-list {
	margin-top: 0;
}

#game {
	display: flex;
	padding: 10px;

	grid-area: game;
	justify-content: center;
	flex-direction: column;
}

#footer {
	padding: 5px;

	grid-area: footer;

	text-align: center;
}
</style>
