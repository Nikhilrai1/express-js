const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const PORT = 3500;

// custom middleware => logger
app.use(logger)

// cross origin resource sharing
const whiteLists = ["http://localhost:3500"]
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
app.use(cors(corsOptions))
// built in middleware to handle urlencoded data
// in other words, form dada:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false })) // for get form data from post request

// built-in middleware for json
app.use(express.json()); // handle json data


// built-in middleware for serving static file like css, javascript, text etc
app.use(express.static(path.join(__dirname, "/public"))); // apply for every static file


// regular expression (..)? => optional regex
//serving file
app.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})
app.get("^/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
})
app.get("^/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html"); // 301 => redirect code
})


// route handler
app.get("/index(.html)?", (req, res, next) => {
    console.log("attmpting index");
    next();
}, (req, res, next) => {
    res.send("index")
})

// chaining route handler
const one = (req, res, next) => {
    console.log("one");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res) => {
    console.log("three");
    res.send("finished")
}

// like a middleware
app.get("/chain(.html)?", [one, two, three])


app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }
    else if (req.accepts("json")) {
        res.json({ "error": "404 Not Found" })
    }
    else {
        res.type("txt").send("404 Not Found")
    }
})


// error handler middleware
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))