const child_process = require('child_process');
const fs = require('fs');
const process = require('process');

const mktemp = require('mktemp');

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

const LEVELS_FILE = 'levels.json';
const levels = JSON.parse(fs.readFileSync(LEVELS_FILE, 'utf8')).levels;
const generatedLevels = [];

for (const level of levels) {
	console.log('Reading level `' + level.ident + '` "' + level.name + '"');
	const results = getResults(level.variations);

	let generatedVariations = [];
	for (var i = 0; i < results.length; ++i) {
		const variation = level.variations[i];
		const result = results[i];

		console.log('\t' + variation + ' = "' + result + '"');

		generatedVariations.push([variation, result]);
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
