<template>
	<div v-if="loaded" id="app">
		<div
			id="hamburger"
			@click="toggleLevelsListVisibility" v-bind:class="{ visible: !levelsListVisible }">
			<span id="hamburger-icon">&#x2630;</span>
		</div>
		<h1 id="header">Rust <code>format!</code> Game</h1>
		<section id="levels-list" v-bind:class="{ visible: levelsListVisible }">
			<h2>Levels</h2>
			<span
				id="close"
				@click="toggleLevelsListVisibility" v-bind:class="{ visible: levelsListVisible }">X</span>
			<LevelsList
				@level-click="changeLevel"
				v-bind:levels="levels" v-bind:best-time-store="bestTimeStore" v-bind:current-level-ident="currentLevel.ident" />
		</section>
		<Game
			id="game" ref="game"
			@finish-level="finishLevel" @next-level="nextLevel"
			v-bind:level-index="currentLevelIndex" v-bind:level="currentLevel" v-bind:has-next-level="!isLastLevel" />
		<!-- &#xFE0F is the character VS16 (variation selector 16) - forces heart to be an emoji, not just a black blob -->
		<footer id="footer">made with ❤&#xFE0F; by <a href="https://twitter.com/The6P4C">@The6P4C</a> / <a href="https://the6p4c.github.io/">the6p4c.github.io</a></footer>
	</div>
	<div v-else id="app-loading">
		<span id="app-loading-message">
			<template v-if="loadingFailed">We're sorry, but something's gone wrong loading the WASM module we use for evaluating Rust format strings 😢 Maybe your browser doesn't support WASM? (Error: {{ loadingError }})</template>
			<template v-else>Loading...</template>
		</span>
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
			currentLevelIndex: 0, // May be updated in mounted

			levelsListVisible: false // Only used in small layouts
		};
	},
	computed: {
		loaded: function() {
			return this.$root.$data.formatter != null;
		},
		loadingError: function() {
			return this.$root.$data.formatterLoadError;
		},
		loadingFailed: function() {
			return this.loadingError != null;
		},
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
		toggleLevelsListVisibility: function() {
			this.levelsListVisible = !this.levelsListVisible;
		},
		changeLevel: function(index) {
			// Hide the menu if the user selects a new level
			if (this.levelsListVisible) {
				this.toggleLevelsListVisibility();
			}

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
	/* Stack shamelessly stolen from https://becca.ooo */
	font-family: "Segoe UI", "-apple-system", "San Francisco", "Helvetica", "Noto Sans", "Geneva", "Helvetica Neue", "Helvetica", "Helvetica Neue LT", "Arial", sans-serif, "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Noto Serif";
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

	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		"hamburger header"
		"game game"
		"footer footer";
}

@media (min-width: 800px) {
	#app {
		grid-template-columns: 300px auto;
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

#hamburger {
	display: none;

	align-items: center;

	font-size: 26px;
}

#hamburger.visible {
	display: flex;
}

@media (min-width: 800px) {
	#hamburger.visible {
		display: none;
	}
}

#hamburger-icon {
	margin-left: 15px;

	font-size: 25px;
}

#close {
	display: none;

	position: absolute;
	top: 20px;
	right: 20px;

	font-size: 26px;

	/* Close button is before the levels list in the DOM, so push it to the top so it's visible */
	z-index: 999;
}

#close.visible {
	display: block;
}

@media (min-width: 800px) {
	#close.visible {
		display: none;
	}
}

#levels-list {
	display: none;
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0px;
	left: 0px;

	padding: 10px;
	box-sizing: border-box;

	background-color: white;

	overflow-y: auto;
}

#levels-list.visible {
	display: block;
}

@media (min-width: 800px) {
	#levels-list {
		display: initial;
		width: auto;
		height: auto;

		position: static;

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

#app-loading {
	display: flex;
	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;
}

#app-loading-message {
	margin: 50px;

	line-height: 200%;
}
</style>
