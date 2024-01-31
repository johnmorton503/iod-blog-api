require("dotenv").config();
const express = require("express");
var cors = require('cors');
const handlebars = require('express-handlebars');
const { handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors } = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const userController = require("./controllers/userController");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express();

app.use(cors());

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.use(express.json());
//Serves static files (we need it to import a css file)
app.use(express.static('public'));

app.use(morganMiddleware);

// Swagger
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swagger/swaggerSpec');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// add post routes
app.use("/api/posts", require("./routes/postRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));

app.use("/users", require("./routes/viewUserRoutes"));

app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.debug(`Example app listening on port ${port}!`);
});
