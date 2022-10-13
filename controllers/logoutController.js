const userDB = {
    users: require("../model/user.json"),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require("fs").promises
const path = require("path")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleLogout = async (req, res) => {
    // on client delete cookie
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ "error": "cookie not found" });
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const foundUser = userDB.users.find(authUser => authUser.refreshToken === refreshToken);
    if (!foundUser) {
        // if not user in db
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(204).json({ "message": "user logout." })
    }

    const remainingUsers = userDB.users.filter(user => user.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: "" }
    userDB.setUsers([...remainingUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "user.json"),
        JSON.stringify(userDB.users)
    )
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    return res.status(204).json({ "message": "user logout." })
}

module.exports = { handleLogout }