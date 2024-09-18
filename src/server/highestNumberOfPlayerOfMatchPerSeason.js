//Find a player who has won the highest number of Player of the Match awards for each season

import fs,{read} from "fs"

const matchesJSON=JSON.parse(fs.readFileSync(new URL("../public/output/matches.json",import.meta.url)));

const deliveriesJSON=JSON.parse(fs.readFileSync(new URL("../public/output/deliveries.json",import.meta.url)));

function getHighestNumberOfPlayerOfMatch(matchesJSON,deliveriesJSON){
    const awardsBySeason = {};

    // Iterate through matches to count Player of the Match awards per season and player
    for (const { season, player_of_match } of matchesJSON) {
        if (!awardsBySeason[season]) {
            awardsBySeason[season] = {};
        }

        if (!awardsBySeason[season][player_of_match]) {
            awardsBySeason[season][player_of_match] = 0;
        }

        awardsBySeason[season][player_of_match] += 1;
    }

    const highestAwardsBySeason = {};

    // Find the player with the highest number of awards for each season
    for (const [season, players] of Object.entries(awardsBySeason)) {
        let maxAwards = 0;
        let topPlayer = '';

        for (const [player, count] of Object.entries(players)) {
            if (count > maxAwards) {
                maxAwards = count;
                topPlayer = player;
            }
        }

        highestAwardsBySeason[season] = { player: topPlayer, awards: maxAwards };
    }

    return highestAwardsBySeason;
}


const result=getHighestNumberOfPlayerOfMatch(matchesJSON,deliveriesJSON)

fs.writeFileSync("./src/public/output/highestNumberOfPlayerOfMatchPerSeason.json",JSON.stringify(result,null,2),"utf-8");

console.log("Result written to output folder");