import express from "express";
const app = express();
const PORT = 3300;

app.get("/", (req, res) => {
  res.send("Welcome to Short URL");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
