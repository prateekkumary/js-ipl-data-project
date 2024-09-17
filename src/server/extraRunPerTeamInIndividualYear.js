// import fs, { read } from "fs";

import fs from "fs";
import path from "path";
const baseDirectory = process.cwd();

// Define the paths to the JSON files
const matchesFilePath = path.join(
  baseDirectory,
  "src",
  "public",
  "output",
  "matches.json"
);
const deliveriesFilePath = path.join(
  baseDirectory,
  "src",
  "public",
  "output",
  "deliveries.json"
);

// Read JSON files
const matchesJSON = JSON.parse(fs.readFileSync(matchesFilePath, "utf-8"));
const deliveriesJSON = JSON.parse(fs.readFileSync(deliveriesFilePath, "utf-8"));

function getExtraRunsConcededPerTeam(year) {
  const matchId = [];
  for (const match of matchesJSON) {
    if (match.season === year.toString()) {
      matchId.push(match.id);
    }
  }
  const extraRunByTeam = {};
  for (const delivery of deliveriesJSON) {
    let bowlingTeam = delivery.bowling_team;
    let extraRun = Number.parseInt(delivery.extra_runs);
    let id = delivery.match_id;
    if (!(bowlingTeam in extraRunByTeam) && matchId.indexOf(id) !== -1) {
      extraRunByTeam[bowlingTeam] = extraRun;
    } else if (matchId.indexOf(id) !== -1) {
      extraRunByTeam[bowlingTeam] += extraRun;
    }
  }
  return extraRunByTeam;
}

// Get extra runs conceded per team for the year 2016
const extraRuns2016 = getExtraRunsConcededPerTeam(2016);

// Write results to file
const outputFilePath = path.join(
  baseDirectory,
  "src",
  "public",
  "output",
  "extraRunPerTeamInYear.json"
);
fs.writeFileSync(
  outputFilePath,
  JSON.stringify(extraRuns2016, null, 2),
  "utf-8"
);

console.log("Result written to extraRunPerTeamInYear.json");
