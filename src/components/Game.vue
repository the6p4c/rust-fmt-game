<template>
<main class="game">
	<template v-if="isStateWaiting">
		<h2>{{ levelIndex + 1 }}. {{ level.name }}</h2>
		<p v-for="line in level.description" v-bind:key="line" v-html="line"></p>
		<button @click="startLevel">Start</button>
	</template>
	<template v-else>
		<code v-if="isStatePlaying" class="problem">{{ variation }}</code>
		<code v-else class="problem"><a v-bind:href="playgroundLink" target="blank">{{ variation }}</a></code>
		<code class="equals">==</code>
		<input
			v-model="answer" ref="answer"
			class="answer" type="text" spellcheck="false"
			v-bind:class="{ 'correct': isStateFinished }" v-bind:readonly="isStateFinished">
		<div class="timer-and-hint">
			<span class="timer">{{ timerString }}</span>
			<span class="hint">Stuck? Read the <a href="https://doc.rust-lang.org/std/fmt/index.html"><code>std::fmt</code> documentation</a></span>
		</div>
		<div v-if="isStateFinished" class="controls">
			<button @click="replay" class="replay">Replay</button>
			<button class="next-level">Next level</button>
		</div>
	</template>
</main>
</template>

<script>
export default {
	name: 'Game',
	props: {
		levelIndex: Number,
		level: Object
	},
	data: function() {
		return {
			// Will be populated inside selectRandomVariation (called on mount
			// & replay)
			variationIndex: null,
			state: 'waiting',
			timer: 0,
			answer: ''
		};
	},
	computed: {
		isStateWaiting: function() {
			return this.state == 'waiting';
		},
		isStatePlaying: function() {
			return this.state == 'playing';
		},
		isStateFinished: function() {
			return this.state == 'finished';
		},
		variation: function() {
			return this.level.variations[this.variationIndex][0];
		},
		playgroundLink: function() {
			const rsFileText = 
				'fn main() {\n' +
				'\tlet s = ' + this.variation + ';\n' +
				'\n' +
				'\tprintln!("{:?}", s);\n' +
				'}';
			const rsFileTextEscaped = encodeURIComponent(rsFileText);

			return 'https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&code=' + rsFileTextEscaped;
		},
		result: function() {
			return this.level.variations[this.variationIndex][1];
		},
		timerString: function() {
			const minutes = Math.floor(this.timer / 60);
			const seconds = this.timer % 60;

			const minutesString = ('' + minutes).padStart(2, '0');
			const secondsString = ('' + seconds).padStart(2, '0');

			return minutesString + ':' + secondsString;
		}
	},
	methods: {
		selectRandomVariation: function() {
			this.variationIndex = Math.floor(Math.random() * this.level.variations.length);
		},
		startLevel: function() {
			this.state = 'playing';
			// Wait until changes to DOM have been rendered, otherwise the
			// answer element doesn't exist yet and therefore we can't set focus
			// to it
			this.$nextTick(function() {
				this.$refs.answer.focus();
			});
		},
		replay: function() {
			this.state = 'waiting';
			this.answer = '';
			this.selectRandomVariation();
		}
	},
	watch: {
		answer: function() {
			if (this.answer == this.result) {
				this.state = 'finished';
			}
		}
	},
	mounted: function() {
		this.selectRandomVariation();
	}
};
</script>

<style scoped>
.game p {
	margin-top: 10px;
	margin-bottom: 10px;

	line-height: 130%;
}

.game h2 + p {
	margin-top: 0;
}

.problem, .equals {
	display: inline-block;

	text-align: center;
}

.problem, .equals, .answer {
	font-size: 200%;
}

.problem {
	margin-top: 10px;
}

.equals {
	margin-top: 10px;
	margin-bottom: 10px;
}

.answer {
	padding-left: 10px;
	padding-right: 10px;

	line-height: 200%;
}

.answer.correct {
	background-color: #0F6;
}

.timer-and-hint {
	display: flex;
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;

	flex-direction: column;
	justify-content: flex-end;
}

@media (min-width: 800px) {
	.timer-and-hint {
		flex-direction: row;
		justify-content: space-between;
	}
}

.timer {
	font-size: 120%;
	font-variant-numeric: tabular-nums;
}

.timer, .hint {
	text-align: right;
}

.controls {
	display: flex;
	justify-content: flex-end;
}

.replay, .next-level {
	margin-top: 10px;
	margin-left: 10px;

	font-size: 110%;
	line-height: 200%;
}
</style>
