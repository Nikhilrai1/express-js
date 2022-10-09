const logEvent = require("./logEvent");
const fs = require("fs");
const fsPromises = fs.promises;
const http = require("http")
const path = require("path")
const EventEmitter = require("events");
class Emitter extends EventEmitter { }


// initilize object
const myEmitter = new Emitter();

// add listener for log event
myEmitter.on("log",(msg,fileName) => logEvent(msg,fileName));

// server
const PORT = process.env.PORT || 3500


// serveFile function
const serveFile = async (filePath, contentType, response) => {
    try {
        console.log(contentType)
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? "utf-8" : ''
        );
        let data = contentType === "application/json" ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200,
            { "Content-Type": contentType }
        );
        response.end(contentType === "application/json" ? JSON.stringify(data) : data);
    } catch (error) {
        // serving internal server error
        myEmitter.emit("log", `${error.name} \t ${error.message}`, "errorLog.txt")
        response.statusCode = 500;
        response.end();
    }
}



// creating server
const server = http.createServer((req, res) => {
    myEmitter.emit("log", `${req.url} \t ${req.method}`, "reqLog.txt")
    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
    }


    // define filePath for different cases
    let filePath =
        contentType === 'text/html' && req.url === '/' ? path.join(__dirname, "views", "index.html") : contentType === "text/html" && req.url.slice(-1) === "/" ? path.join(__dirname, "views", req.url, "index.html") : contentType === "text/html" ? path.join(__dirname, "views", req.url) : path.join(__dirname, req.url)


    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== "/") filePath += '.html';


    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    }
    else {
        // 404
        // 301 redirect
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                // redirect
                res.writeHead(301, { 'Location': "/new-page.html" });
                res.end();
                break;
            case 'www-page.html':
                //redirect
                res.writeHead(301, { 'Location': "/" });
                res.end();
                break;
            default:
                // default serve be 404 error page
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res)
        }
    }

})



server.listen(PORT, (req, res) => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})



