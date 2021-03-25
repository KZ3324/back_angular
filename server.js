const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// app.use(express.json({extended:true}));
// app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({extended:true}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = require("./app/models/role.models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count == 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err)=> {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      })
      new Role({
        name: "admin",
      }).save((err)=> {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      })
    }
  });
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tetsuo application." });
});

require("./app/routes/turorial.routes")(app);

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const initRoutes = require("./app/routes");

app.use(express.urlencoded({ extended: true }));
// initRoutes(app);
