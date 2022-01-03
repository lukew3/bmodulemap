# bmodulemap
Create a visual representation of local module requirements for your browserify js applications.

Arrows point from the file requesting another module to the module that it is requesting.

## Example 
The following map was created from https://github.com/lukew3/congol/blob/main/client/js/main.js
![output](https://user-images.githubusercontent.com/47042841/147898241-dbd84095-0372-4b38-940a-92d1f6e84c60.png)

## Setup
To use bmodulemap, you need to have graphviz installed on your computer. [Install graphviz](http://www.graphviz.org/download/)

Then, install bmodulemap
```
npm i -g bmodulemap
```

### Dev Setup
Clone the repo, and enter it. Install requirements with
```
npm ci
```
You can test the app by running
```
node index.js
```
or by installing it and running it by running
```
npm i -g ../bmodulemap
bmodulemap
```

## Usage

After installing, you can run bmodulemap from the terminal by running
```
bmodulemap
```
