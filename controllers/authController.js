const userDB = {
    users: require("../model/user.json"),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fsPromises = require("fs").promises;
require("dotenv").config()

const handleLogin = async (req, res) => {
    console.log(req.body)
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "error": "Required username & password" });

    const foundUser = userDB.users.find(authUser => authUser.username === user);
    if (!foundUser) return res.status(401).json({ "error": "UnAuthorized!" });
    const matchPassword = await bcrypt.compare(pwd, foundUser.password);

    if (matchPassword) {
        const roles = Object.values(foundUser.roles)
        // create jwt token
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRECT,
            { expiresIn: "30s" }
        )

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRECT,
            { expiresIn: "1d" }
        )

        // saving current  user in db file
        const otherUsers = userDB.users.filter(otherUser => otherUser.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken }
        userDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "user.json"),
            JSON.stringify(userDB.users)
        )
        // secure and samesite are set for allowed cross origin
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ accessToken })
    }
    else {
        res.status(401).json({ "error": "UnAuthorized" })
    }
}

module.exports = { handleLogin }