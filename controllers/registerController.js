const userDB = {
    users: require("../model/user.json") || [],
    setUsers: function (data) { this.users = data }
}

const fsPromises = require("fs").promises
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Required user and password." });

    // if duplicate
    const duplicate = userDB.users.find(authUser => authUser.username === user)

    if (duplicate) {
        console.log("duplicate")
        return res.status(422).json({ "error": "Duplicate error" })
    } // send data duplicate error

    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(pwd, salt);
        const newUser = {
            "username": user,
            "roles":{"User":2001},
            "password": hashedPassword
        }

        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "user.json"),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users)
        res.status(201).json({ "success": `New user ${user} created successfully!` })
    } catch (error) {
        res.status(500).json({ "error": "Internal server error", "message": error.message })
    }
}

module.exports = {
    handleNewUser
}


