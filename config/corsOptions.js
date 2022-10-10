const whiteLists = [
    "http://localhost:3500",
]
var corsOptions = {
    origin: (origin, callBack) => {
        if (whiteLists.indexOf(origin) !== -1 || !origin) {
            // callBack(err,res)
            callBack(null, true)
        }
        else {
            callBack(new Error("Not allowed."))
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = corsOptions;