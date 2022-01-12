const app = require("express")();
const passport = require("passport");
const session = require("express-session");
const { MONGO_URI, SECRET, SESSION_EXP_TIME } = require("../config/globals");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("../middleware/errorHandling");

//Router and Middlerwares
const routers = require("../routes/index");
const routesConfig = require("../routes/routes.config");

//socket.io server
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Handlebar Engine
let exphbs = require("express-handlebars");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: "./src/views/layouts/",
    partialsDir: "./src/views/partials/",
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Persistence with MongoDB for Sessions
const mongoStore = require("connect-mongo");
const advancedOptionsMongo = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Sessions
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URI,
      MongoOptions: advancedOptionsMongo,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_EXP_TIME,
    },
  })
);

// Passport
require("../auth/auth.config")(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(routesConfig(routers(io)));

// Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = server;
