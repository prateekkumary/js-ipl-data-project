//Number of matches played per year for all the years in IPL.

import fs, { read } from "fs";
import path from "path";
import csv from "csv-parser";

const matchesJSON = JSON.parse(
  fs.readFileSync(new URL("../public/output/matches.json", import.meta.url))
);

//const matchPerYear = {};

function countMatchesPerYear() {
  const matchesPerYear = matchesJSON.reduce((accumulator, { season }) => {
    if (!accumulator[season]) {
      accumulator[season] = 1;
    } else {
      //matchesWonPerTeam;
      accumulator[season] = accumulator[season] + 1;
    }
    return accumulator;
  }, {});
  return matchesPerYear;
}
const Result = countMatchesPerYear();

fs.writeFileSync(
  "./src/public/output/matchPerYear.json",
  JSON.stringify(Result, null, 2),
  "utf-8"
);
console.log("Result written to matchesPerYEar.json");
