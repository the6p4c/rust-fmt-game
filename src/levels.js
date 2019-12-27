function oneOf(...l) {
	return l[Math.floor(Math.random() * l.length)];
}

function concat(...l) {
	return l.join('');
}

export default [
	{
		ident: 'intro',
		name: 'Intro',
		description: [
			"Simple to start off. Brush up now, while you can!",
			"Once you click Start, type the result of the displayed <code>format!</code> call as fast as possible. No quotes required - just type the content of the resultant string.",
			"When your answer correctly matches the result, the textbox will go green and the timer will stop. Your best time will be recorded for each level.",
			"(The <a href='https://doc.rust-lang.org/std/fmt/index.html' target='blank'><code>std::fmt</code></a> reference might come in handy!)"
		],
		generator: () => {
			const spec = '{} {}';
			const params = ['hello', 'world'];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'positional',
		name: 'Positional',
		description: [
			"Non-positional parameters are easy, but there's a world of fun to be discovered with positional parameters.",
			"From here on out, each level has several variations that you might be presented. Replay as many times as you want, but pay close attention to the format string and arguments!"
		],
		generator: () => {
			const spec = oneOf('{0}{1}{0}', '{1}{0}{1}');
			const params = oneOf(['hello', 'world'], ['world', 'hello']);

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'positional2',
		name: 'Positional 2',
		description: ["Surely we can't use non-positional and positional parameters in the same format string... right?"],
		generator: () => {
			const spec = oneOf('{0} {} {1} {}', '{1} {} {0} {}', '{} {0} {} {1}', '{} {1} {} {0}');
			const params = oneOf([10, 20], [20, 10]);

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'alignment',
		name: 'Alignment',
		description: [
			'Strings need room to breathe, too!',
			'Our first taste of using formatting parameters to customise output.'
		],
		generator: () => {
			const spec = concat('{:', oneOf('6', '7', '8'), '}', oneOf('!', '?', '.'));
			const params = [oneOf('hello', 'world', 'space', 'types', 'refer')];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'alignment2',
		name: 'Alignment 2',
		description: ["Alignment wouldn't be all too useful if all we had was right-side padding with spaces. How about we mix it up a bit?"],
		generator: () => {
			const spec = concat(
				'{:',
				oneOf('', ' ', '0', 'x'),
				'>',
				oneOf('6', '7', '8'),
				'}{:',
				oneOf('>', '<', ''),
				oneOf('6', '7', '8'),
				'}'
			);
			const params = [
				oneOf('hello', 'world', 'space', 'types', 'refer'),
				oneOf('hello', 'world', 'space', 'types', 'refer')
			];

			return {
				spec: spec,
				params: params
			};
		}
	}
]
