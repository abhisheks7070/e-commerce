const express = require('express')
const cors = require("cors")
const port = 5000
const jwt = require("jsonwebtoken")
const secret = "123123"
const {middleware} = require("./auth")
const router = require("./routes/signin")
const mongoose = require('mongoose');


const app = express()
const corsOptions = {
    // origin: "http://localhost:5173" // frontend URI (ReactJS)
    origin: "https://myshopee-x5ih.onrender.com" // frontend URI (ReactJS)
}

// app.use(cors());
app.use(cors(corsOptions));

app.use(express.json())
app.use("/", router);

mongoose.connect('mongodb+srv://sabhishek7070:Ttorres9@cluster0.3githov.mongodb.net/Myshopee');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.listen(port, ()=>{console.log("app is running on port " + port)})




// const express = require('express')
// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })