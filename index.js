import dotenv from "dotenv";
import express from "express";
import { OAuth2Client } from "google-auth-library";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize OAuth2Client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json()); // Middleware to parse JSON bodies

// Route for receiving ID token via POST request
app.post("/verify-token", async (req, res) => {
  try {
    // const { token } = req.body;
    // if (!token) {
    //   return res.status(400).send("Token is required");
    // }

    // // Verify the ID token and get the ticket
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID, // Specify the audience (CLIENT_ID) of the app
    // });

    // const payload = ticket.getPayload();
    // const userid = payload["sub"]; // Get user ID from payload

    // Here, you can add logic to create or update the user in your database
    // For this example, we'll just return the user ID and email
    console.log(`test working`);
    res.send({ test: "testvalue" });
    // res.send({ userid, email: payload.email });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
