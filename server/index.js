const express = require("express"),
      celery = require("celery-node"),
      app = express(),
      client = celery.createClient(
        "redis://localhost:6379",
        "redis://localhost:6379"
      );

const task = client.createTask("digit_inference.guess_digit");
const port = process.env.PORT || 3001;


app.get("/", (req, res) => {
  const result = task.applyAsync([1]);
  result.get().then(data => {
    console.log(data);
  });
  return res.send("Hello Bihhhh!");
});


app.listen(port, () => console.log(`App runnning at localhost://${port}`));