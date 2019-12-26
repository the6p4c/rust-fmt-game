<template>
	<div id="app">
		<h1 id="header">Rust <code>format!</code> Game</h1>
		<LevelsList id="levels-list" v-bind:levels="levels" v-bind:best-times="bestTimes" v-bind:current-level="currentLevel" />
		<!-- &#xFE0F is the character VS16 (variation selector 16) - forces heart to be an emoji, not just a black blob -->
		<footer id="footer">made with ❤&#xFE0F; by <a href="https://twitter.com/The6P4C">@The6P4C</a> / <a href="https://the6p4c.github.io/">the6p4c.github.io</a></footer>
	</div>
</template>

<script>
import LevelsList from './components/LevelsList.vue';

export default {
	name: 'app',
	components: {
		LevelsList
	},
	data: () => {
		return {
			levels: [
				{ "ident": "intro", "name": "Intro" },
				{ "ident": "positional", "name": "Positional" },
				{ "ident": "positional2", "name": "Positional 2" }
			],
			bestTimes: {"positional": 60 * 15 + 16},
			currentLevel: "intro"
		};
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

#footer {
	padding: 5px;

	grid-area: footer;

	text-align: center;
}
</style>
