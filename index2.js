import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/", async (req, res) => {
  try {
    console.log(`test working`);
    res.send({ test: "testvalue" });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
