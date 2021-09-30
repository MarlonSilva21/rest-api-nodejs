const fs = require('fs');  //module that allows working with node's file system
const path = require('path'); //module that allows working with folder path

module.exports = app => {
    fs
        .readdirSync(__dirname) //reading the directory that is operating
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js"))) //filtering archives that do not start with a dot and that are not index.js
        .forEach(file => require(path.resolve(__dirname, file))(app))  // scrolling through the files and passing the (APP) to them
}
