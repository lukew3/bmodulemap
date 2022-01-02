const fs = require('fs');
const util = require('util');
const graphviz = require('graphviz');
const path = require('path');

// Create digraph G
let g = graphviz.digraph("G");
let startPath = '/home/luke/congol/client/js';
let startFile = 'main.js';

// items of modules are '<filename>': <diagram-node-object>
let modules = {};

// Create starting node
modules[startFile] = g.addNode(startFile);


const correctFilename = (parentFilename, childFilename) => {
	// this assumes that the require begins with './'
	console.log(parentFilename);
	console.log(childFilename);
	if (path.dirname(parentFilename) === '.')
		return childFilename.substring(2);
	if (childFilename.substring(0, 3) === '../')
		return path.dirname(path.dirname(parentFilename)) + childFilename.substring(2);
	return path.dirname(parentFilename) + childFilename.substring(1);
};

const handleRequire = (parentFilename, childFilename) => {
	// if require is not local, return
	if (childFilename[0] !== '.') return;
	// correct filename to remove './' or '../' and add parentFilename's directory
	childFilename = correctFilename(parentFilename, childFilename);
	if (modules[childFilename] === undefined) {
		// Create node and add to modules
		modules[childFilename] = g.addNode(childFilename);
		// readModule(childFilename)
		readModule(childFilename);
	}
	// Create segment linking parent and child
	g.addEdge(modules[parentFilename], modules[childFilename]);
};

const readModule = (filename) => {
	let content = fs.readFileSync(startPath + '/' + filename).toString();
	console.log(content);
	let newArr = content.split('require(');
	let reqNames = [];
	newArr.forEach((item, index) => {
		if (index == 0) return;
		let withquotes = item.split(')')[0];
		let path = withquotes.substring(1, withquotes.length-1);
		console.log(path);
		handleRequire(filename, path);
	});
	/*
	fs.readFile(startPath + '/' + filename, 'utf8', (err, data) => {
		console.log(data);
		// get names of requires
			// handle require (parentFilename, childFilename)
	});
	*/
};

// start parsing 
readModule(startFile);

// Print .dot file
console.log( g.to_dot() );
// Set GraphViz path (if not in your path)
g.setGraphVizPath( "/usr/bin" );
// Generate a PNG output
g.output( "svg", "output.svg" );
