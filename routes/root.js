const express = require("express")
const path = require("path")
const router = express.Router()

// regular expression (..)? => optional regex
//serving file
router.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "views", "index.html"));
})

module.exports = router;
