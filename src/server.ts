import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";
import { HelloWorld } from "./hello-world";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;
let serverHitList: string[] = [];

app.get("/", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/creation-time", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  const dateOfRequestHandling = new Date();

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

// app.get("/ponies/random", (req, res) => {

//   const randomPony = pickRandom(ponyData)
//   res.json({
//     message: "Loaded a single random pony:",
//     data: randomPony,
//     countedAsHit: false,
//   });
// });

app.get("/season-one", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
    routes: serverHitList,
  });
});

app.get("/season-one/random", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

app.get("/hello-world", (req, res) => {
  let currentRoute = req.path;
  serverHitList.push(currentRoute);

  res.json({
    data: HelloWorld,
  });
});

app.get("/server-hit-list", (req, res) => {
  res.json({
    routes: serverHitList,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
