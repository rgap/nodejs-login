import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const data = response.data;

    if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(403).send("Token is not intended for this audience");
    }

    // Further validation can be added here (e.g., check 'iss' field, expiry)

    // Assuming validation passes, you can proceed with your user handling logic
    res.send({ userid: data.sub, email: data.email });
  } catch (error) {
    console.error("Error verifying ID token:", error.response ? error.response.data : error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
