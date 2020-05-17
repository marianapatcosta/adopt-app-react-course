import express from "express";
const React = require("react");
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

res.write(parts[0]);
// it will split "the big html file String" in two,
const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
  //it will be rendered on the server and sent to react as markup
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
  /*   res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end(); */
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
