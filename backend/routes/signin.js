const express = require("express")
const router = express.Router()
const { middleware } = require("../auth")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const secret = "123123"
const {User} = require('../db')



router.post('/signup', async (req, res) => {
    const body = await req.body
    // const saltRounds = 10; // You can adjust the number of salt rounds
    // const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    const success = User.findOne({email : body.email})
    console.log(success)
    if (!success) {
        
        const user = await User.create({
            name: body.name,
            email: body.email,
            password: body.password
        })
    }
})

router.post("/signin", async (req, res) => {
    const body = await req.body
    const success = await User.find({email : body.email, password : body.password})

    // let isMatch
    
    // if (success) {
    //     isMatch = await bcrypt.compare(body.password, success.password);
    // }

    if (success) {
        const token = jwt.sign(body, secret, {
            expiresIn: 86400
        });
        res.status(200).send(token)
    }
    else {

        res.status(404).json({ msg: "error" })
    }
})

router.get("/signin", middleware, async (req, res) => {

    res.json({msg: "loggedIn"})
})

module.exports = router