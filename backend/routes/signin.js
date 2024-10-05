const express = require("express")
const router = express.Router()
const { middleware } = require("../auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const secret = "123123"


let users = [{
    email: 'as@gmail.com',
    password: '$2b$10$dV6HsdG/XHpZsDPTMJv1NeOvqR3vjAc4MJJLfGvuhyf2sOY5r1NtO'
  }]

router.post("/signin", async (req, res) => {
    const body = await req.body
    const success = users.find((e) => {
        return e.email == body.email
    })
    let isMatch
    if (success) {

        isMatch = await bcrypt.compare(body.password, success.password);
        console.log(success.password)
        console.log(isMatch)
    }

    if (success && isMatch) {
        const token = jwt.sign(body, secret, {
            expiresIn: 86400
        });
        res.status(200).send(token)
    }
    else {

        res.status(404).json({ msg: "error" })
    }
})

router.post('/signup', async (req, res) => {
    const body = await req.body
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    const success = users.find((e) => {
        return (e.email == body.email)
    })
    console.log(success)
    if (!success) {

        users = [...users, { email: body.email, password: hashedPassword }]
        console.log(users)
    }
})

router.get("/", middleware, async (req, res) => {

    res.json(users.filter((e) => {
        return (e.email != req.email)
    }))
})

module.exports = router