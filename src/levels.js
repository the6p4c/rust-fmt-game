const WORDS4 = ['able', 'also', 'area', 'away', 'baby', 'back', 'ball', 'bank', 'base', 'beat', 'best', 'bill', 'blue', 'body', 'book', 'born', 'both', 'call', 'card', 'care', 'case', 'cell', 'city', 'cold', 'come', 'cost', 'dark', 'data', 'deal', 'deep', 'door', 'down', 'draw', 'drop', 'each', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'face', 'fact', 'fail', 'fall', 'fast', 'fear', 'feel', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'five', 'food', 'foot', 'form', 'four', 'free', 'from', 'full', 'fund', 'game', 'girl', 'give', 'goal', 'good', 'grow', 'hair', 'half', 'hand', 'hard', 'have', 'head', 'hear', 'heat', 'help', 'here', 'high', 'hold', 'home', 'hope', 'hour', 'huge', 'idea', 'into', 'item', 'join', 'just', 'keep', 'kind', 'know', 'land', 'last', 'late', 'lead', 'left', 'less', 'life', 'like', 'line', 'list', 'live', 'long', 'look', 'lose', 'loss', 'love', 'main', 'make', 'many', 'mean', 'meet', 'mind', 'miss', 'more', 'most', 'move', 'much', 'must', 'name', 'near', 'need', 'news', 'next', 'nice', 'none', 'note', 'once', 'only', 'onto', 'open', 'over', 'page', 'part', 'pass', 'past', 'pick', 'plan', 'play', 'poor', 'pull', 'push', 'race', 'rate', 'read', 'real', 'rest', 'rich', 'rise', 'risk', 'road', 'rock', 'role', 'room', 'rule', 'safe', 'same', 'save', 'seat', 'seek', 'seem', 'sell', 'send', 'show', 'side', 'sign', 'sing', 'site', 'size', 'skin', 'some', 'song', 'soon', 'sort', 'star', 'stay', 'step', 'stop', 'such', 'sure', 'take', 'talk', 'task', 'team', 'tell', 'tend', 'term', 'test', 'than', 'that', 'them', 'then', 'they', 'this', 'thus', 'time', 'town', 'tree', 'trip', 'true', 'turn', 'type', 'unit', 'upon', 'very', 'view', 'vote', 'wait', 'walk', 'wall', 'want', 'wear', 'week', 'well', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'will', 'wind', 'wish', 'with', 'word', 'work', 'yard', 'yeah', 'year', 'your'];

const WORDS5 = ['about', 'above', 'admit', 'adult', 'after', 'again', 'agent', 'agree', 'ahead', 'allow', 'alone', 'along', 'among', 'apply', 'argue', 'avoid', 'begin', 'black', 'board', 'break', 'bring', 'build', 'carry', 'catch', 'cause', 'chair', 'check', 'child', 'civil', 'claim', 'class', 'clear', 'close', 'coach', 'color', 'could', 'court', 'cover', 'dream', 'drive', 'early', 'eight', 'enjoy', 'enter', 'event', 'every', 'exist', 'field', 'fight', 'final', 'first', 'floor', 'focus', 'force', 'front', 'glass', 'great', 'green', 'group', 'guess', 'happy', 'heart', 'heavy', 'hotel', 'house', 'human', 'image', 'issue', 'large', 'later', 'laugh', 'learn', 'least', 'leave', 'legal', 'level', 'light', 'local', 'major', 'maybe', 'media', 'might', 'model', 'money', 'month', 'mouth', 'movie', 'music', 'never', 'night', 'north', 'occur', 'offer', 'often', 'order', 'other', 'owner', 'paper', 'party', 'peace', 'phone', 'piece', 'place', 'plant', 'point', 'power', 'price', 'prove', 'quite', 'radio', 'raise', 'range', 'reach', 'ready', 'right', 'scene', 'score', 'sense', 'serve', 'seven', 'shake', 'share', 'short', 'since', 'skill', 'small', 'smile', 'sound', 'south', 'space', 'speak', 'spend', 'sport', 'staff', 'stage', 'stand', 'start', 'state', 'still', 'stock', 'store', 'story', 'study', 'stuff', 'style', 'table', 'teach', 'thank', 'their', 'there', 'these', 'thing', 'think', 'third', 'those', 'three', 'throw', 'today', 'total', 'tough', 'trade', 'treat', 'trial', 'truth', 'under', 'until', 'value', 'visit', 'voice', 'watch', 'water', 'where', 'which', 'while', 'white', 'whole', 'whose', 'woman', 'world', 'worry', 'would', 'write', 'wrong', 'young'];

const WORDS6 = ['accept', 'across', 'action', 'affect', 'agency', 'almost', 'always', 'amount', 'animal', 'answer', 'anyone', 'appear', 'around', 'arrive', 'artist', 'assume', 'author', 'become', 'before', 'behind', 'better', 'beyond', 'budget', 'camera', 'career', 'center', 'chance', 'change', 'charge', 'choice', 'choose', 'common', 'couple', 'course', 'create', 'debate', 'decade', 'decide', 'degree', 'design', 'detail', 'dinner', 'doctor', 'during', 'effect', 'effort', 'either', 'energy', 'enough', 'entire', 'expect', 'expert', 'factor', 'family', 'father', 'figure', 'finger', 'finish', 'follow', 'forget', 'former', 'friend', 'future', 'garden', 'ground', 'growth', 'happen', 'health', 'impact', 'indeed', 'inside', 'itself', 'lawyer', 'leader', 'letter', 'likely', 'listen', 'little', 'manage', 'market', 'matter', 'member', 'memory', 'method', 'middle', 'minute', 'modern', 'moment', 'mother', 'myself', 'nation', 'nature', 'nearly', 'notice', 'number', 'office', 'option', 'others', 'parent', 'people', 'period', 'person', 'player', 'policy', 'pretty', 'public', 'rather', 'really', 'reason', 'recent', 'record', 'reduce', 'region', 'relate', 'remain', 'remove', 'report', 'result', 'return', 'reveal', 'school', 'season', 'second', 'senior', 'series', 'should', 'simple', 'simply', 'single', 'sister', 'social', 'source', 'speech', 'spring', 'street', 'strong', 'suffer', 'summer', 'system', 'theory', 'though', 'threat', 'toward', 'travel', 'weight', 'window', 'within', 'wonder', 'worker', 'writer'];

const WORDS7 = ['ability', 'account', 'address', 'against', 'already', 'another', 'article', 'because', 'believe', 'benefit', 'between', 'billion', 'brother', 'capital', 'central', 'century', 'certain', 'clearly', 'college', 'company', 'compare', 'concern', 'contain', 'control', 'country', 'culture', 'current', 'defense', 'despite', 'develop', 'discuss', 'economy', 'evening', 'exactly', 'example', 'explain', 'federal', 'feeling', 'finally', 'foreign', 'forward', 'general', 'herself', 'himself', 'history', 'however', 'hundred', 'husband', 'imagine', 'improve', 'include', 'instead', 'involve', 'kitchen', 'machine', 'manager', 'measure', 'medical', 'meeting', 'mention', 'message', 'million', 'mission', 'morning', 'natural', 'network', 'nothing', 'outside', 'partner', 'patient', 'pattern', 'perform', 'perhaps', 'picture', 'popular', 'prepare', 'present', 'prevent', 'private', 'problem', 'process', 'produce', 'product', 'program', 'project', 'protect', 'provide', 'purpose', 'quality', 'quickly', 'reality', 'realize', 'receive', 'reflect', 'require', 'respond', 'science', 'section', 'serious', 'service', 'several', 'similar', 'society', 'someone', 'special', 'station', 'student', 'subject', 'success', 'suggest', 'support', 'surface', 'teacher', 'thought', 'through', 'tonight', 'trouble', 'usually', 'various', 'western', 'whether', 'without'];

const WORDS8 = ['activity', 'actually', 'although', 'analysis', 'anything', 'approach', 'attorney', 'audience', 'behavior', 'building', 'business', 'campaign', 'computer', 'consider', 'consumer', 'continue', 'cultural', 'customer', 'daughter', 'decision', 'describe', 'director', 'discover', 'economic', 'employee', 'everyone', 'evidence', 'hospital', 'identify', 'increase', 'indicate', 'industry', 'interest', 'language', 'magazine', 'maintain', 'majority', 'marriage', 'material', 'movement', 'national', 'official', 'painting', 'personal', 'physical', 'position', 'positive', 'possible', 'practice', 'pressure', 'probably', 'property', 'question', 'recently', 'remember', 'research', 'resource', 'response', 'security', 'shoulder', 'somebody', 'southern', 'specific', 'standard', 'strategy', 'suddenly', 'thousand', 'together', 'training', 'whatever', 'yourself'];

function randomChoice(l) {
	return l[Math.floor(Math.random() * l.length)];
}

function randomBetween(minInclusive, maxInclusive) {
	const span = maxInclusive - minInclusive + 1;

	return Math.floor(Math.random() * span) + minInclusive;
}

function randomSumTo(n, sum) {
	const cutPoints = [0];
	for (let i = 0; i < n - 1; ++i) {
		cutPoints.push(randomBetween(0, sum));
	}
	cutPoints.push(sum);

	// Sort ascending
	cutPoints.sort((a, b) => a - b);

	const values = [];
	for (let i = 1; i < cutPoints.length; ++i) {
		values.push(cutPoints[i] - cutPoints[i - 1]);
	}

	return values;
}

function shuffle(l) {
	// Just a Fisher-Yates shuffle
	const l2 = [...l]; // shallow copy
	for (let i = 0; i < l2.length - 1; ++i) {
		const j = randomBetween(i, l2.length - 1);

		let tmp = l2[j];
		l2[j] = l2[i];
		l2[i] = tmp;
	}
	return l2;
}

function concat(l) {
	return l.map(x => '' + x).join('');
}

export default [
	{
		ident: 'intro',
		name: 'Intro',
		description: [
			"Simple to start off. Brush up now, while you can!",
			"Once you click Start, type the result of the displayed <code>format!</code> call as fast as possible. No quotes required - just type the content of the resultant string.",
			"When your answer correctly matches the result, the textbox will go green and the timer will stop. Your best time will be recorded for each level.",
			"(The <a href='https://doc.rust-lang.org/std/fmt/index.html' target='_blank' rel='noreferrer noopener'><code>std::fmt</code></a> reference might come in handy!)"
		],
		generator: () => {
			const spec = '{}, world!';
			const params = ['hello'];

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
			"<strong>From here on out, each level is randomised!</strong> Replay each as many times as you want, but pay close attention to the format string and arguments - they'll change!"
		],
		generator: () => {
			const spec = randomChoice([
				'{0} {1} {0}',
				'{1} {0} {1}'
			]);
			const params = shuffle(WORDS5).slice(0, 2);

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'positional2',
		name: 'Positional 2',
		description: ["Surely we can't use both non-positional <strong>and</strong> positional parameters in the same format string... right?"],
		generator: () => {
			const spec = randomChoice([
				'{0} {} {1} {}',
				'{1} {} {0} {}',
				'{} {0} {} {1}',
				'{} {1} {} {0}'
			]);
			const params = shuffle(WORDS5).slice(0, 2);

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
			"Strings need room to breathe, too!",
			"Our first taste of using formatting parameters to customise output."
		],
		generator: () => {
			const PUNCTUATION = ['!', '?', '.'];

			const spec = concat([
				'{:',
				randomBetween(6, 8),
				'}',
				randomChoice(PUNCTUATION)
			]);
			const params = [randomChoice([...WORDS4, ...WORDS5])];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'alignment2',
		name: 'Alignment 2',
		description: ["Alignment wouldn't be all too useful if all we had was left alignment using spaces. How about we mix it up a bit?"],
		generator: () => {
			const FILLS = ['', ' ', '0', 'x'];
			const ALIGNS = ['>', '<', ''];
			const PUNCTUATION = ['!', '?', '.'];

			const spec = concat([
				'{:',
				randomChoice(FILLS),
				'>',
				randomBetween(6, 8),
				'}{:',
				randomChoice(ALIGNS),
				randomBetween(6, 8),
				'}',
				randomChoice(PUNCTUATION)
			]);
			const params = [
				randomChoice([...WORDS4, ...WORDS5]),
				randomChoice([...WORDS4, ...WORDS5])
			];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'precision',
		name: 'Precision',
		description: [
			"Not for decimals, but for strings. Forgive me - floating-point is hard!"
		],
		generator: () => {
			const PUNCTUATION = ['!', '?', '.'];

			const precision = randomBetween(3, 5);
			const words = [
				// Only use short words if they'll actually be truncated
				...(precision < 4 ? WORDS4 : []),
				...(precision < 5 ? WORDS5 : []),
				...WORDS6, ...WORDS7, ...WORDS8
			];

			const spec = concat([
				'{:.',
				precision,
				'}',
				randomChoice(PUNCTUATION)
			]);
			const params = [randomChoice(words)];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'precision-alignment',
		name: 'Precision & Alignment',
		description: ["String arguments again, combining our last two formatting parameter types."],
		generator: () => {
			const FILLS = ['0', '1', 'x', '_', ' '];
			const ALIGNS = ['<', '>'];
			const PUNCTUATION = ['!', '?', '.'];

			const precision = randomBetween(3, 5);
			const width = randomBetween(precision + 1, 9);
			const words = [
				// Only use short words if they'll actually be truncated
				...(precision < 4 ? WORDS4 : []),
				...(precision < 5 ? WORDS5 : []),
				...WORDS6, ...WORDS7, ...WORDS8
			];

			const spec = concat([
				'{:',
				randomChoice(FILLS),
				randomChoice(ALIGNS),
				width,
				'.',
				precision,
				'}',
				randomChoice(PUNCTUATION)
			]);
			const params = [randomChoice(words)];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'numeric',
		name: 'Numeric',
		description: ["Now that you've got the hang of strings, let's tackle integers. Firstly, alignment."],
		generator: () => {
			const spec = concat([
				'{:+0',
				randomBetween(3, 7),
				'}'
			]);
			const params = [
				// A random decimal number, excluding those which are zero mod 100
				randomChoice([1, -1]) * (randomBetween(0, 9) * 100 + randomBetween(1, 99))
			];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'numeric-bases',
		name: 'Numeric: Bases',
		description: [
			"Binary. It's how computers <em>think</em>.",
			"I've been kind - you shouldn't need a calculator for these conversions."
		],
		generator: () => {
			const base = randomChoice(['b', 'o', randomChoice(['x', 'X'])]);

			// Generate "nice" numbers in their respective bases (i.e. the
			// conversion from decimal can be done in your head)
			let alignment, value;
			if (base == 'b') {
				alignment = randomBetween(9, 15);
				value = Math.pow(2, randomBetween(0, 7));
			} else if (base == 'o') {
				alignment = randomBetween(3, 9);
				value = randomChoice([1, 8]) * randomBetween(1, 7);
			} else {
				alignment = randomBetween(3, 9);
				value = randomChoice([1, 16]) * randomBetween(1, 15);
			}

			const [alternate, alignmentSpec] = randomChoice([
				['#', ''],
				['', concat([randomChoice(['', '0']), alignment])],
				['#', concat([randomChoice(['', '0']), alignment])]
			]);

			const spec = concat([
				'{:',
				randomChoice(['', '+']),
				alternate,
				alignmentSpec,
				base,
				'}'
			]);
			const params = [value];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'positional-alignment',
		name: 'Positional & Alignment',
		description: [
			"Alignment and positional parameters meet at last, for better or for worse.",
			"Hope you know what <code>$</code> does!"
		],
		generator: () => {
			const FILLS = ['0', '1', 'x', '_', ' '];
			const ALIGNS = ['<', '>'];

			const order = shuffle(randomChoice([
				[[0, 0], [0, 1]],
				[[0, 0], [1, 0]],
				[[0, 0], [1, 1]],
				[[0, 1], [0, 0]],
				[[0, 1], [0, 1]],
				[[0, 1], [1, 0]],
				[[0, 1], [1, 1]]
			]));

			const genArgument = (valueIndex, widthIndex, fillAlign) => concat(['{', valueIndex, ':', fillAlign, widthIndex, '$}']);

			const [valueIndex1, widthIndex1] = order[0];
			const [valueIndex2, widthIndex2] = order[1];

			const spec = concat([
				genArgument(valueIndex1, widthIndex1, concat([randomChoice(FILLS), randomChoice(ALIGNS)])),
				genArgument(valueIndex2, widthIndex2, concat([randomChoice(FILLS), randomChoice(ALIGNS)]))
			]);
			const params = [
				randomBetween(3, 10),
				randomBetween(3, 10)
			];

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'combo',
		name: 'Combo',
		description: ["Combining some of the tricks we've learned."],
		generator: () => {
			const FILLS = ['0', '1', 'x', '_', ' ', ':', '>', '<', '^', '$'];
			const ALIGNS = ['<', '>'];

			const numNonPositionalWidths = randomBetween(1, 3);
			const numSlots = 2 * 3 - numNonPositionalWidths;

			// Since every parameter must be used, we can't have more parameters
			// than slots remaining to put them in. But, we'll reduce by one to
			// force some duplication (bit more of a challenge).
			const numParams = randomBetween(3, numSlots - 1);

			// Each parameter can maximally take up every slot, less one slot
			// for each other parameter, and less one as zero represents one use
			// (until we add 1 with map)
			const counts = randomSumTo(numParams, numSlots - (numParams - 1) - 1).map(x => x + 1);

			let slotIndices = [];
			for (let i = 0; i < counts.length; ++i) {
				for (let count = 0; count < counts[i]; ++count) {
					slotIndices.push(i);
				}
			}

			slotIndices = shuffle(slotIndices);

			const nonPositionalWidth = shuffle([
				numNonPositionalWidths > 0,
				numNonPositionalWidths > 1,
				numNonPositionalWidths > 2
			]);

			let spec = '';
			let index = 0;
			for (let i = 0; i < 3; ++i) {
				const valueIndex = slotIndices[index++];
				spec += concat([
					'{',
					// If we could leave off the value index (and make the
					// parameter positional), do it if the user's unlucky
					(valueIndex == i && randomBetween(1, 5) == 1) ? '' : valueIndex,
					':',
					randomChoice(FILLS),
					randomChoice(ALIGNS),
					['+', '0', '+0', ''][Math.min(randomBetween(0, 7), 3)],
					nonPositionalWidth[i] ? randomBetween(3, 8) : concat([slotIndices[index++], '$']),
					'}'
				]);
			}

			const params = shuffle([4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).slice(0, numParams);

			return {
				spec: spec,
				params: params
			};
		}
	},
	{
		ident: 'combo2',
		name: 'Combo 2',
		description: ["Like Combo but worse >:)"],
		generator: () => {
			const FILLS = ['0', '1', 'x', '_', ' ', ':', '>', '<', '^', '$'];
			const ALIGNS = ['<', '>'];

			const numStringSpecifiers = randomBetween(1, 2);
			const numNumericSpecifiers = 3 - numStringSpecifiers;

			const numImmediateWidths = randomBetween(1, 2);
			const numPositionalWidths = 3 - numImmediateWidths;
			const numImmediatePrecisions = randomBetween(0, numStringSpecifiers);
			const numPositionalPrecisions = numStringSpecifiers - numImmediatePrecisions;

			const iiws = shuffle([
				numImmediateWidths > 0,
				numImmediateWidths > 1,
				numImmediateWidths > 2
			]);

			const iips = shuffle([
				numImmediatePrecisions > 0,
				...(numStringSpecifiers == 2 ? [numImmediatePrecisions > 1] : [])
			]);

			const specifierTypes = shuffle([
				{
					type: 's',
					isImmediateWidth: iiws[0],
					isImmediatePrecision: iips[0]
				},
				{
					type: 'n',
					isImmediateWidth: iiws[1]
				},
				{
					type: numStringSpecifiers == 2 ? 's' : 'n',
					isImmediateWidth: iiws[2],
					...(numStringSpecifiers == 2 ? { isImmediatePrecision: iips[1] } : {})
				}
			]);

			const numStringSlots = numStringSpecifiers;
			const numNumericSlots = numNumericSpecifiers + numPositionalWidths + numPositionalPrecisions;

			const numStringParams = randomBetween(1, numStringSlots);
			// No more parameters than slots (again -1 for some duplication).
			const numNumericParams = randomBetween(2, numNumericSlots - 1);

			// Each parameter can maximally take up every slot, less one slot
			// for each other parameter, and less one as zero represents one use
			// (until we add 1 with map)
			const numericCounts = randomSumTo(numNumericParams, numNumericSlots - (numNumericParams - 1) - 1).map(x => x + 1);
			let numericSlotIndices = [];
			for (let i = 0; i < numericCounts.length; ++i) {
				for (let count = 0; count < numericCounts[i]; ++count) {
					numericSlotIndices.push(i);
				}
			}
			numericSlotIndices = shuffle(numericSlotIndices);

			const stringCounts = randomSumTo(numStringParams, numStringSlots - (numStringParams - 1) - 1).map(x => x + 1);
			let stringSlotIndices = [];
			for (let i = 0; i < stringCounts.length; ++i) {
				for (let count = 0; count < stringCounts[i]; ++count) {
					stringSlotIndices.push(i + numNumericParams);
				}
			}
			stringSlotIndices = shuffle(stringSlotIndices);

			let params = [
				...shuffle([4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).slice(0, numNumericParams),
				...shuffle([...WORDS4, ...WORDS5, ...WORDS6, ...WORDS7, ...WORDS8]).slice(0, numStringParams)
			];

			// indexIndirection[oldIndex] = newIndex
			let indexIndirection = [];
			for (let i = 0; i < params.length; ++i) {
				indexIndirection.push(i);
			}
			indexIndirection = shuffle(indexIndirection);

			let newParams = []
			for (let i = 0; i < params.length; ++i) {
				newParams[indexIndirection[i]] = params[i];
			}

			let spec = '';
			let numericSlotIndex = 0;
			let stringSlotIndex = 0;
			for (let i = 0; i < specifierTypes.length; ++i) {
				const specifierType = specifierTypes[i];
				const isString = specifierType.type == 's';

				const valueIndex = indexIndirection[isString ? stringSlotIndices[stringSlotIndex++] : numericSlotIndices[numericSlotIndex++]];
				spec += concat([
					'{',
					// If we could leave off the value index (and make the
					// parameter positional), do it if the user's unlucky
					(valueIndex == i && randomBetween(1, 5) == 1) ? '' : valueIndex,
					':',
					randomChoice(FILLS),
					randomChoice(ALIGNS),
					specifierType.isImmediateWidth ? randomBetween(3, 8) : concat([indexIndirection[numericSlotIndices[numericSlotIndex++]], '$']),
					...(isString ? ['.', specifierType.isImmediatePrecision ? randomBetween(3, 7) : concat([indexIndirection[numericSlotIndices[numericSlotIndex++]], '$'])] : []),
					'}'
				]);
			}

			return {
				spec: spec,
				params: newParams
			};
		}
	}
]
