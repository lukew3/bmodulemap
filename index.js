const { moduleMap } = require('./modulemap.js');
const os = require('os');
const path = require('path');

function getAbsolutePath(filepath, delim = "/") {
  if (filepath == null || typeof filepath !== "string") throw Error("invalid filepath");
  const homedir = os.homedir();
  filepath = filepath.replace(/\~/g, homedir + delim);
  return path.resolve(filepath);
}

const cli = () => {
	const argv = require('yargs')
		.usage('Usage: $0 [FILE]')
		.help('h')
		.argv;

	if (argv._[0]) {
		moduleMap(getAbsolutePath(argv._[0]));
	} else {
		// could show help screen here instead of just telling them that the file was not specified
		console.log("File not specified");
	}
};

exports.cli = cli;
