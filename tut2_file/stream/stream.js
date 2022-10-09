const fs = require("fs");
const path = require("path")
// console.log(path)
// console.log(path.dirname(__filename)
// require(".")

// const filePath =  require("../file/file")
// stream
const rs = fs.createReadStream("file.txt",{encoding: "utf-8"})

const ws = fs.createWriteStream("newLoream.txt")

// rs.on("data",chunkData => {
//     ws.write(chunkData)
//     console.log(chunkData)
// })

// pipe --> more efficient than listener for streaming data
rs.pipe(ws)