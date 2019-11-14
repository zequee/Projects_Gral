const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");
const app = express();
require("dotenv").config();

//CORS
var cors = require("cors");
app.use(cors());

// cors(app)
// routes(app)

//.ENV
// var env = require('node-env-file');
// env(__dirname + '/.env');

// app.get('/prueba', function(req, res) {
//   res.send('hello world');
// });

//Settings
app.set("port", process.env.PORT || 8000);
// app.set("port", process.env.PORT);

// app.listen(port, function(){
//   console.log(`server listen in port ${port}`);
// });

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/vehicles", require("./routes/vehicle"));
app.use("/assignment", require("./routes/assignment"));
app.use("/vehicleEditions", require("./routes/vehicleEditions"));
app.use("/vehicleNotifications", require("./routes/vehicleNotifications"));

//Static Files
app.use(express.static("public"));
// app.use('/uploads',express.static('uploads'))

//Starting Server
app.listen(app.get("port"), () => {
  console.log("server on port ${app.get('port')}");
});
