const fs = require('fs');
const util = require('util');
const graphviz = require('graphviz');
const path = require('path');

const moduleMap = (file) => {
  // Create digraph G
  let g = graphviz.digraph("G");
  if (!fs.existsSync(file)) {
    console.log(`Error: File ${file} does not exist`);
    return;
  }
  let startPath = path.dirname(file);
  let startFile = path.basename(file);

  // items of modules are '<filename>': <diagram-node-object>
  let modules = {};

  // Create starting node
  modules[startFile] = g.addNode(startFile);


  const correctFilename = (parentFilename, childFilename) => {
  	let parentPath = path.dirname(parentFilename);
  	if (parentPath === '.')
  		return childFilename.substring(2);
    // this should probably be recursive
  	if (childFilename.substring(0, 3) === '../') {
  		let parentPath2 = path.dirname(parentPath);
  		if (parentPath2 == '.') return childFilename.substring(3);
  		return parentPath2 + childFilename.substring(2);
  	}
  	return parentPath + childFilename.substring(1);
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
  	let newArr = content.split('require(');
  	let reqNames = [];
  	newArr.forEach((item, index) => {
  		if (index == 0) return;
  		let withquotes = item.split(')')[0];
  		let path = withquotes.substring(1, withquotes.length-1);
  		handleRequire(filename, path);
  	});
  };

  // start parsing
  readModule(startFile);

  // Print .dot file
  console.log( g.to_dot() );
  // Set GraphViz path (if not in your path)
  g.setGraphVizPath( "/usr/bin" );
  // Generate a PNG output
  g.output( "svg", "output.svg" );
};

module.exports = {
  moduleMap
}
