//Find the number of times each team won the toss and also won the match

import fs, { read } from "fs";

const matchesJSON = JSON.parse(
  fs.readFileSync(new URL("../public/output/matches.json", import.meta.url))
);

//console.log(matchesJSON);

const deliveriesJSON = JSON.parse(
  fs.readFileSync(new URL("../public/output/deliveries.json", import.meta.url))
);
//console.log(dileveriesJSON);

function getNumberOfWinTossAndMatchesByTeam(matchesJSON, deliveriesJSON) {
  const tossAndMatchWinner = {};
  const matchWinner = {};
  const tossWinner = {};
  matchesJSON.forEach((match) => {
    const { toss_winner, winner } = match;
    if (!tossWinner[toss_winner]) {
      tossWinner[toss_winner] = 0;
    }
    tossWinner[toss_winner]++;

    if (!matchWinner[winner]) {
      matchWinner[winner] = 0;
    }
    matchWinner[winner]++;
  });

  matchesJSON.forEach((match) => {
    const { toss_winner, winner } = match;

    if (toss_winner === winner) {
      if (!tossAndMatchWinner[toss_winner]) {
        tossAndMatchWinner[toss_winner] = 0;
      }
      tossAndMatchWinner[toss_winner] += 1;
    }
  });
  return tossAndMatchWinner;
}

const result = getNumberOfWinTossAndMatchesByTeam(matchesJSON, deliveriesJSON);

fs.writeFileSync(
  "./src/public/output/numberOfWinToss&MatchByTeam.json",
  JSON.stringify(result, null, 2),
  "utf-8"
);


console.log("Result written to numberOfWinToss&MatchByTeam.json");
//console.log(result);
