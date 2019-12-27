<template>
<main class="game">
	<template v-if="isStateWaiting">
		<h2>{{ levelIndex + 1 }}. {{ level.name }}</h2>
		<p v-for="line in level.description" v-bind:key="line" v-html="line"></p>
		<button @click="startLevel">Start</button>
		<a v-bind:href="'#' + level.ident" class="permalink">Permalink to this level</a>
	</template>
	<template v-else>
		<code v-if="isStatePlaying" class="problem">{{ variation.formatCall }}</code>
		<code v-else class="problem"><a v-bind:href="playgroundLink" target="blank">{{ variation.formatCall }}</a></code>
		<code class="equals">==</code>
		<input
			v-model="guess" ref="guess"
			class="guess" type="text" spellcheck="false"
			v-bind:class="{ 'correct': isStateFinished }" v-bind:readonly="isStateFinished">
		<div class="timer-and-hint">
			<span class="timer">{{ timerString }}</span>
			<span class="hint">Stuck? Read the <a href="https://doc.rust-lang.org/std/fmt/index.html" target="blank"><code>std::fmt</code> documentation</a> / <a @click.prevent="reset" href="#">reset</a></span>
		</div>
		<div v-if="isStateFinished" class="controls">
			<button @click="replay" class="replay">Generate new &amp; replay</button>
			<button v-if="hasNextLevel" @click="nextLevel" class="next-level">Next level</button>
		</div>
	</template>
</main>
</template>

<script>
export default {
	name: 'Game',
	props: {
		levelIndex: Number,
		level: Object,
		hasNextLevel: Boolean
	},
	data: function() {
		return {
			state: 'waiting',

			// Will be populated inside selectRandomVariation (called on mount
			// and reset/replay)
			variation: null,

			guess: '',

			tickInterval: null,
			startTime: 0,
			endTime: 0,
			timer: 0
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
		playgroundLink: function() {
			const rsFileText = 
				'fn main() {\n' +
				'\tlet s = ' + this.variation.formatCall + ';\n' +
				'\n' +
				'\tprintln!("{:?}", s);\n' +
				'}';
			const rsFileTextEscaped = encodeURIComponent(rsFileText);

			return 'https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&code=' + rsFileTextEscaped;
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
			const variationData = this.level.generator();
			this.variation = this.$root.$data.formatter(variationData.spec, variationData.params);
		},
		startLevel: function() {
			this.selectRandomVariation();

			this.state = 'playing';

			this.guess = '';
			// Wait until changes to DOM have been rendered, otherwise the
			// guess element doesn't exist yet and therefore we can't set focus
			// to it
			this.$nextTick(function() {
				this.$refs.guess.focus();
			});

			this.startTime = Date.now();

			const self = this;
			this.tickInterval = setInterval(function() {
				let endTime = Date.now();
				if (self.isStateFinished) {
					endTime = self.endTime;
				}

				const millis = endTime - self.startTime;

				self.timer = Math.floor(millis / 1000);
			}, 50);

			// Avoid seeing an old value for a short moment until the first
			// invocation of our interval timer
			self.timer = 0;
		},
		replay: function() {
			this.startLevel();
		},
		nextLevel: function() {
			this.$emit('next-level');
		},
		reset: function() {
			this.state = 'waiting';

			// Timer could still be running if the reset is due to a change of
			// level
			this.clearTickInterval();
		},
		clearTickInterval: function() {
			if (this.tickInterval) {
				clearInterval(this.tickInterval);
				this.tickInterval = null;
			}
		}
	},
	watch: {
		levelIndex: function() {
			this.reset();
		},
		level: function() {
			this.reset();
		},
		guess: function() {
			if (this.guess == this.variation.result) {
				this.state = 'finished';
				this.endTime = Date.now();

				this.clearTickInterval();

				this.$emit('finish-level', this.timer);
			}
		}
	},
	destroyed: function() {
		this.clearTickInterval();
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

.permalink {
	margin-top: 10px;

	text-align: right;
}

.problem, .equals {
	display: inline-block;

	text-align: center;
}

.problem, .equals, .guess {
	font-size: 130%;
}

@media (min-width: 800px) {
	.problem, .equals, .guess {
		font-size: 200%;
	}
}

.problem {
	margin-top: 10px;
}

.equals {
	margin-top: 10px;
	margin-bottom: 10px;
}

.guess {
	padding-left: 10px;
	padding-right: 10px;

	line-height: 200%;
}

.guess.correct {
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
