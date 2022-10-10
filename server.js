const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const PORT = 3500;

// custom middleware => logger
app.use(logger)

// cross origin resource sharing
app.use(cors(corsOptions))


// built in middleware to handle urlencoded data
// in other words, form dada:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false })) // for get form data from post request

// built-in middleware for json
app.use(express.json()); // handle json data


// built-in middleware for serving static file like css, javascript, text etc
app.use("/",express.static(path.join(__dirname, "/public"))); // apply for every static file

app.use("/",require("./routes/root"))
app.use("/employee",require("./routes/api/employee"))



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