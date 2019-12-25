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

	const executableFile = mktemp.createFileSync('problem-gen-XXXXX');
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

const PROBLEMS_FILE = 'problems.json';
const problems = JSON.parse(fs.readFileSync(PROBLEMS_FILE, 'utf8')).problems;
const generatedProblems = [];

for (const problem of problems) {
	console.log('Reading problem "' + problem.name + '"');
	const results = getResults(problem.variations);

	let generatedVariations = [];
	for (var i = 0; i < results.length; ++i) {
		const variation = problem.variations[i];
		const result = results[i];

		console.log('\t' + variation + ' = "' + result + '"');

		generatedVariations.push([variation, result]);
	}

	generatedProblems.push({
		name: problem.name,
		description: problem.description,
		variations: generatedVariations
	});
}

const OUTPUT_FILE = 'public/problems.json';
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedProblems));
