const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path")
const date = new Date();

const logEvent = async (message,logName) => {
    const logItem = `${date}\t ${message} \n`
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "logs"))
    }
    try {
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem)
        console.log(`${date}\t ${message} \n`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = logEvent;
