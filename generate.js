const assert = require('assert');
const child_process = require('child_process');
const fs = require('fs');
const process = require('process');
const util = require('util');

const mktemp = require('mktemp');

function gvClassify(v) {
	if (typeof v == 'string') {
		return 'string';
	}

	if (v.hasOwnProperty('concat')) {
		return 'concat';
	}

	if (v.hasOwnProperty('one of')) {
		return 'one of';
	}
}

function generateVariations(variations) {
	const t = gvClassify(variations);

	if (t == 'string') {
		return [variations];
	}

	if (t == 'one of') {
		// 'one of' kind of acts as a list of sub-problems, so solve them and
		// flatten (since each sub-problem could contain a sub-sub-problem,
		// etc.)
		return variations['one of'].map(generateVariations).flat();
	}

	if (t == 'concat') {
		const concat = variations['concat'];

		var i;
		let nonStringFound = false;
		for (i = 0; i < concat.length; ++i) {
			if (gvClassify(concat[i]) != 'string') {
				nonStringFound = true;
				break;
			}
		}

		if (nonStringFound) {
			const firstNonString = concat[i];
			const variationsOfFirstNonString = generateVariations(firstNonString);

			var results = [];
			for (const variation of variationsOfFirstNonString) {
				const concatClone = [...concat];
				concatClone[i] = variation;

				const subvariations = generateVariations({ 'concat': concatClone });
				for (const subvariation of subvariations) {
					results.push(subvariation);
				}
			}

			return results;
		} else {
			return [concat.join('')];
		}
	}
}

assert.deepEqual(generateVariations("hello"), ["hello"]);
assert.deepEqual(generateVariations({ "concat": ["a"] }), ["a"]);
assert.deepEqual(generateVariations({ "concat": ["a", "b"] }), ["ab"]);
assert.deepEqual(generateVariations({ "concat": ["a", "b", "c"] }), ["abc"]);
assert.deepEqual(generateVariations({ "one of": ["a"] }), ["a"]);
assert.deepEqual(generateVariations({ "one of": ["a", "b"] }), ["a", "b"]);
assert.deepEqual(generateVariations({ "one of": ["a", "b", "c"] }), ["a", "b", "c"]);
assert.deepEqual(generateVariations(
	{
		"one of": [
			{ "one of": ["a"] },
			{ "one of": ["b"] }
		]
	}
), ["a", "b"]);
assert.deepEqual(generateVariations(
	{
		"one of": [
			{ "one of": ["a", "b"] },
			{ "one of": ["c"] }
		]
	}
), ["a", "b", "c"]);
assert.deepEqual(generateVariations(
	{
		"concat": [
			"x",
			{ "one of": ["a", "b"] }
		]
	}
), ["xa", "xb"]);
assert.deepEqual(generateVariations(
	{
		"concat": [
			"x",
			{ "one of": ["a", "b"] },
			"y",
			{ "one of": ["c", "d"] }
		]
	}
), ["xayc", "xayd", "xbyc", "xbyd"]);

function getResults(variations) {
	const variationsString = variations.join(',');

	const RS_FILE_TEXT = `fn main() {
	let variations = vec![${variationsString}];

	for variation in variations {
		println!("[START]{}[END]", variation);
	}
}`;

	const executableFile = mktemp.createFileSync('level-gen-XXXXX');
	const rsFile = executableFile + '.rs';

	fs.writeFileSync(rsFile, RS_FILE_TEXT);

	child_process.execSync(`rustc ${rsFile} -o ${executableFile}`);
	const results = child_process.execSync(`./${executableFile}`);

	fs.unlinkSync(rsFile);
	fs.unlinkSync(executableFile);

	return results.toString('utf8').trim().split('\n').map(line => {
		return line.trim().match(/^\[START\](.*)\[END\]$/)[1];
	});
}

const CHUNK_SIZE = 200;

const LEVELS_FILE = 'levels.json';
const levels = JSON.parse(fs.readFileSync(LEVELS_FILE, 'utf8')).levels;
const generatedLevels = [];

for (const level of levels) {
	console.log('Reading level `' + level.ident + '` "' + level.name + '"');
	const allVariations = generateVariations(level.variations);

	let generatedVariations = [];
	for (var chunk = 0; chunk < Math.ceil(allVariations.length / CHUNK_SIZE); ++chunk) {
		const variations = allVariations.slice(CHUNK_SIZE * chunk, CHUNK_SIZE * (chunk + 1));
		const results = getResults(variations);

		for (var i = 0; i < results.length; ++i) {
			const variation = variations[i];
			const result = results[i];

			console.log('\t' + variation + ' = "' + result + '"');

			generatedVariations.push([variation, result]);
		}
	}

	generatedLevels.push({
		ident: level.ident,
		name: level.name,
		description: level.description,
		variations: generatedVariations
	});
}

const OUTPUT_FILE = 'src/levels.js';
fs.writeFileSync(OUTPUT_FILE, 'export default ' + JSON.stringify(generatedLevels) + ';');
