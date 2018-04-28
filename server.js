const express = require('express');
var bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
const app = express();

var PORT = process.env.PORT || 1138;

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
  