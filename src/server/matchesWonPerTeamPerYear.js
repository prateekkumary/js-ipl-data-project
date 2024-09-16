//Number of matches won per team per year in IPL.

import fs from "fs";

// Read the JSON file asynchronously
const matchesJson = JSON.parse(
  fs.readFileSync(new URL("../public/output/matches.json", import.meta.url))
);

function countMatchesWonPerTeam(matchesJson) {
  const matchesWonPerTeam = {};
  matchesJson.forEach((match) => {
    let season = match.season;
    let winner = match.winner; // Default to 'abandon' if no winner

    if (winner === "") {
      winner = "abandon";
    }

    if (!matchesWonPerTeam[season]) {
      matchesWonPerTeam[season] = {};
    }

    if (!matchesWonPerTeam[season][winner]) {
      matchesWonPerTeam[season][winner] = 0;
    }

    matchesWonPerTeam[season][winner]++;
  });
  return matchesWonPerTeam;
}
const Result = countMatchesWonPerTeam(matchesJson);
fs.writeFileSync(
  "./src/public/output/matchesWonPerTeamPerYear.json",
  JSON.stringify(Result, null, 2),
  "utf-8"
);
console.log("Result written to matchWonPerYerperTeam.json");
