const userDB = {
    users: require("../model/user.json"),
    setUsers: function (data) { this.users = data }
}

const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ "error": "cookie not found" });
    const refreshToken = cookies.jwt;
    const foundUser = userDB.users.find(authUser => authUser.refreshToken === refreshToken);
    if (!foundUser) return res.status(403).json({ "error": "Forbidden!" });
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRECT,
        (err, decode) => {
            if (err || (foundUser.username !== decode.username)) return res.status(403).json({ "error": "Forbidden." });
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": decode.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRECT,
                { expiresIn: "30s" }
            )

            res.status(200).json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }