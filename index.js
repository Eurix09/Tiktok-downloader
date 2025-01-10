  const fs = require("fs");
  const axios = require("axios");
  const express = require("express");
  const path = require("path");
  const app = express();
  const config = require("./config.json");
  const port = config.port;

  app.get("/", async function (req, res) {
    res.sendFile(path.join(__dirname, "tiktok.html"));
  });

  app.get("/tiktokdl", async function (req, res) {
    const link = req.query.link;
    if (!link) {
      return res.status(400).send("Please provide a Tiktok link.");
    }

    try {
      const tik = await axios.get(`${config.tiktokdl}?url=${link}`);
      res.send(tik.data);
    } catch (error) {
      res.status(500).send("Error fetching TikTok data.");
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });