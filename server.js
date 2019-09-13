const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");
const contacts = require("./routes/api/contacts");


const app = express();


// Added one below (sep 13 5:56)
const path = require("path");


// Bodyparser middleware
app.use (
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


//!!!!
app.use(express.static(path.join(__dirname, "client/build")))



// DB Config
const db = require("./config/keys").mongoURI;


// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true}
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);



// Routes
app.use("/api/users", users);
app.use("/api/contacts", contacts);



const port = process.env.PORT || 5000;
// process.env.port is Heroku's port if we deploy the app there


app.listen(port, () => console.log('Server up and running on port ' + port));