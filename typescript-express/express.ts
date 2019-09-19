let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());

import { Workflow } from "./src/controller/workflow";

app.use(function(req, res, next) {
  res.contentType("application/json");
  next();
});

app.post("/*", function(req, res) {
  const workflow = new Workflow(req);
  workflow.executeSafely().then(function(response) {
    res.status(response.statusCode);
    res.send(response.body);
  });
});

app.listen(8080, function() {
  console.log("Parloa Services App listening on port 8080!");
});
