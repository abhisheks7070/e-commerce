const express = require('express')
const cors = require("cors")
const port = 5000
const jwt = require("jsonwebtoken")
const secret = "123123"
const {middleware} = require("./auth")
const router = require("./routes/signin")

const app = express()
const corsOptions = {
    // origin: "http://localhost:5173" // frontend URI (ReactJS)
    origin: ["https://e-commerce-5ekf.onrender.com"] // frontend URI (ReactJS)
}

// app.use(cors());
app.use(cors(corsOptions));

app.use(express.json())
app.use("/", router);


app.listen(port, ()=>{console.log("app is running on port " + port)})




// const express = require('express')
// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })