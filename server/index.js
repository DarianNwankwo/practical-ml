const express = require("express"),
      celery = require("celery-node"),
      app = express(),
      client = celery.createClient(
        "redis://localhost:6379",
        "redis://localhost:6379"
      );

const task = client.createTask("digit_inference.guess_digit");
const task2 = client.createTask("digit_inference.add");
const port = process.env.PORT || 3001;


app.get("/", (req, res) => {
  const result = task2.applyAsync([10, 100]);
  // const result = task.applyAsync([1]);
  result.get().then(data => {
    console.log(data);
  });
  return res.send("Hello Bihhhh!");
});


app.listen(port, () => console.log(`App runnning at localhost://${port}`));