const { logEvent } = require("./logEvent")

const errorHandler = (err,req,res,next) => {
    console.log(err.name,err.message)
    logEvent(`${err.name} \t ${err.message}`,"errorLog")
    res.status(500).send(err.message)
}

module.exports = errorHandler;