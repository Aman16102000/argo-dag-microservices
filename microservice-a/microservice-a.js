const express = require("express");
const app = express();
const port = 3001;

let jobStatus = "idle"; // Possible values: idle, in-progress, completed, failed

app.use(express.json());

// Start Job
app.post("/start", (req, res) => {
  console.log("Job started on Microservice A...");
  jobStatus = "in-progress";

  // Simulate a job that takes 10 seconds
  setTimeout(() => {
    jobStatus = "completed";
    console.log("Job completed on Microservice A!");
  }, 20000);

  res.send({ message: "Job started on Microservice A." });
});

// Check Job Status
app.get("/status", (req, res) => {
  res.send({ status: jobStatus });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice A is running on http://localhost:${port}`);
});
