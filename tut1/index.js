// ************global instead of window object in nodejs**************
// console.log(global)


// *********************os in nodejs***************
// const os = require('os');
// console.log(os.type())
// console.log(os.homedir())
// console.log("hostname" + os.hostname())
// console.log(os.arch())
// console.log(os.freemem())
// console.log(os.cpus())
// console.log(os.machine)


// **********************path module*********************
// const path = require("path");
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename)) // return full path
// console.log(path.basename(__filename)) // give index.js
// console.log(path.extname(__filename)) // give .js
// console.log(path.parse(__filename)) // give object having filename, basename, extname and dirname


// custom module
const { add,sub,mul,div } = require('./math')
const a=30,b=10;
console.log(add(a,b))
console.log(sub(a,b))
console.log(mul(a,b))
console.log(div(a,b))
