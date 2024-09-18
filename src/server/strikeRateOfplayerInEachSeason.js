//Find the strike rate of a batsman for each season
import fs, { read } from "fs";

const matchesJSON = JSON.parse(
  fs.readFileSync(new URL("../public/output/matches.json", import.meta.url))
);

//console.log(matchesJSON);

const deliveriesJSON = JSON.parse(
  fs.readFileSync(new URL("../public/output/deliveries.json", import.meta.url))
);
// const matchData = require('./matches.json');
// const deliveryData = require('./deliveries.json');  // Ball-by-ball data

function strikeRateOfBatsmanByEachSeason() {
  const seasonWithMatchId = {};

  // Organize matches by season
  for (const { season, id } of matchesJSON) {
    if (!seasonWithMatchId[season]) {
      seasonWithMatchId[season] = [];
    }
    seasonWithMatchId[season].push(id);
  }

  const srOfBatsmanByEachSeason = {};

  for (const delivery of deliveriesJSON) {
    const { match_id, batsman_runs, wide_runs, batsman } = delivery;
    let season = "";

    // Find the season for the match
    for (const year in seasonWithMatchId) {
      if (seasonWithMatchId[year].includes(match_id)) {
        season = year;
        break; // No need to continue if the match is found
      }
    }

    // Initialize structure for the batsman in the specific season
    srOfBatsmanByEachSeason[season] ||= {};
    srOfBatsmanByEachSeason[season][batsman] ||= { run: 0, bowl: 0 };

    // Update runs and ball count
    const runs = Number.parseInt(batsman_runs);
    if (runs > 0) {
      srOfBatsmanByEachSeason[season][batsman].run += runs;
    }
    if (wide_runs == 0) {
      srOfBatsmanByEachSeason[season][batsman].bowl += 1;
    }
  }

  return srOfBatsmanByEachSeason;
}

// Calculate strike rate for each batsman by season
const strikeRateByEachSeason = strikeRateOfBatsmanByEachSeason();
const result = {};

for (const season in strikeRateByEachSeason) {
  result[season] = {};
  for (const batsman in strikeRateByEachSeason[season]) {
    const { run, bowl } = strikeRateByEachSeason[season][batsman];
    const strikeRate = ((run / bowl) * 100).toFixed(2);
    result[season][batsman] = strikeRate;
  }
}

fs.writeFileSync(
  "./src/public/output/strikeRateOfBatsmanEachSeason.json",
  JSON.stringify(result, null, 2),
  "utf-8"
);
console.log("Result written to strikeRateOfBatsmanEachSeason.json");

//console.log(result);
