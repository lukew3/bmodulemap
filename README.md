# bmodulemap
Create a visual representation of local module requirements for your browserify js applications.

Arrows point from the file requesting another module to the module that it is requesting.

[original idea concept](https://ideaspot.org/idea/61d1dcb050aa18fdcb755000)

## Setup
To run this, you need to first have graphviz on your computer. [Install graphviz](http://www.graphviz.org/download/)

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
