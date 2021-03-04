const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const { Db } = require("mongodb");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.blogs = require("./blog.model.js")(mongoose);

db.user = require("./user.models");
db.role = require("./role.models");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;