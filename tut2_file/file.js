// const fs = require("fs")
const { unlink } = require("fs");
const path = require("path")

// **********************read file************************
// fs.readFile(path.join(__dirname,"text.txt"),"utf-8",(err,data) => { // concat of directory and filename
//     if(err) throw err; 
//     // console.log(data.toString())
//     console.log(data)
// })


// **********************write file************************
const content = "Wow fantastic baby."
// fs.writeFile(path.join(__dirname,'reply.txt'),content,(err) => {
//     if(err) throw err;
//     console.log("file write successfully.")
// })

// // **********************append file*************************
// fs.appendFile(path.join(__dirname,'reply.txt'),"\n Appending hahaha !",(err) => {
//     if(err) throw err;
//     console.log("append successfully.")
// })

// // **************************delete file**************************
// fs.rename(path.join(__dirname,'reply.txt'),path.join(__dirname,'newReply.txt'),(err) => {
//     console.log("Rename successfully.")
// })


// **********************fs promises**********************
const fs = require("fs").promises;
const filePath = path.join(__dirname, "text.txt");
const newFilePath = path.join(__dirname, "new.txt")

// const readFile = async () => {
//     try {
//         const data = await fs.readFile(filePath,"utf-8")
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//     }
// }
// readFile()

// const fileOps = async (ops,newFilename,content=null,) => {
//     try {
//         if(ops == "rename"){
//             await fs.rename(path.join(__dirname,currentFilename),path.join(__dirname,newFilename))
//             console.log("File rename successfully")
//         }
//         if(ops == "write"){
//             await fs.writeFile(path.join(__dirname,newFilename),content)
//             console.log("File rename successfully")
//         }
//         else{
//             console.log("Invalid operation")
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }

const fileOps = async () => {
    const pathWithFilename = path.join(__dirname, "Hello.txt");
    try {
        if (require("fs").existsSync(pathWithFilename)) {
            console.log("file exist")
            await fs.unlink(pathWithFilename) // delete file
        }
        else {
            console.log("File not exists")
        }
        console.log("file deleted successfully.")

    } catch (error) {
        console.error("file not exists.")
    }
}
fileOps()
// fileOps("write","Hello.txt","Hi")






// expection error handle
// process.on('uncaughtException',(err) => {
//     console.error("Uncaught expection error: " + err);
//     process.exit(1)
// })