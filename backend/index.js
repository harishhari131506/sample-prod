const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

// Simple API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
