const express = require("express")
const mongoose = require("mongoose")
var routers = require('./routes/routes');
const bodyParser = require("body-parser")

const app = express()



const port = 5000;

const mongodatabaseURL ="mongodb+srv://<name>:<password>@cluster0.cpblx7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodatabaseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection
app.listen(port,()=>{
    console.log("Server is running port" +port);
})

connection.once("open",()=>{
    console.log("MongoDb Connected!")
});

app.use(bodyParser.json());
app.use(routers);
