const express = require("express");
const { fetchSteamData } = require("./services/pupet");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Hello from Puppeteer!");
});

app.get("/steamdata/:appid", async (req, res) => {
  const { appid } = req.params;
  try {
    const result = await fetchSteamData(appid);
    res.json(result);
  } catch (error) {
    console.error("Error fetching Steam data:", error.message);
    res.status(500).json({ error: "Error fetching Steam data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
