const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path")
const date = new Date();

const logEvent = async (message, logName) => {
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

const logger = (req, res, next) => {
    logEvent(`${req.method}\t ${req.headers.origin} \t ${req.url}`, "reqLog.txt")
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = { logger, logEvent };
