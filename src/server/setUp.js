const app = require("express")();
const passport = require("passport");

//Router and Middlerwares
const routers = require("../routes/index");
const routesConfig = require("../routes/routes.config");
const ChatWebsocket = require("../routes/modules/websocket");
//socket.io server
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Passport
require("../middleware/auth.config")(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(routesConfig(routers()));
ChatWebsocket(io);

module.exports = server;
