const express = require("express");
const app = express();
const port = 3002;

let jobStatus = "idle"; // Possible values: idle, in-progress, completed, failed

app.use(express.json());

// Start Job
app.post("/start", (req, res) => {
  console.log("Job started on Microservice B...");
  jobStatus = "in-progress";

  // Simulate a job that takes 5 seconds
  setTimeout(() => {
    jobStatus = "completed";
    console.log("Job completed on Microservice B!");
  }, 20000);

  res.send({ message: "Job started on Microservice B." });
});

// Check Job Status
app.get("/status", (req, res) => {
  res.send({ status: jobStatus });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice B is running on http://localhost:${port}`);
});
