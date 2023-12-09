import path from "path";
import express from "express";

const PORT = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

app.listen(PORT, () => {
  console.log("Server started");
});
