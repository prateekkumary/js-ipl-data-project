

import fs from 'fs';

// Read the JSON file asynchronously
const deliveriesJSON = JSON.parse(fs.readFileSync(new URL('../public/output/deliveries.json', import.meta.url)));

function bestEconomyInSuperOver() {
    const economyBowlersInSuperOver = {};

    for (const delivery of deliveriesJSON) {
        const { is_super_over, bowler, total_runs, wide_runs, noball_runs, legbye_runs, bye_runs } = delivery;
        
        if (is_super_over === '1') {
            const run = Number.parseInt(total_runs);
            const wide = Number.parseInt(wide_runs);
            const noBall = Number.parseInt(noball_runs);
            const legBye = Number.parseInt(legbye_runs);
            const bye = Number.parseInt(bye_runs);

            // Initialize bowler data if not present
            if (!economyBowlersInSuperOver[bowler]) {
                economyBowlersInSuperOver[bowler] = { run: 0, bowl: 0 };
            }

            // Update runs and balls
            if (run > 0) {
                const adjustedRun = legBye > 0 || bye > 0 ? run - legBye - bye : run;
                economyBowlersInSuperOver[bowler].run += adjustedRun;
            }

            if (wide === 0 && noBall === 0) {
                economyBowlersInSuperOver[bowler].bowl += 1;
            }
        }
    }

    return economyBowlersInSuperOver;
}

const economicalSuperOver = bestEconomyInSuperOver();

const bestEconomicalSuperOver = {};
let bestEconomy = 0;
let bestBowler = "";

for (const [bowler, { run, bowl }] of Object.entries(economicalSuperOver)) {
    const over = bowl / 6;
    const economy = (run / over).toFixed(2);
    
    if (parseFloat(economy) < bestEconomy || bestEconomy === 0) {
        bestEconomy = parseFloat(economy);
        bestBowler = bowler;
    }
}

bestEconomicalSuperOver.player_name = bestBowler;
bestEconomicalSuperOver.economy = bestEconomy;

fs.writeFileSync('./src/public/output/bowlerWithBestEcoInSuperOver.json', JSON.stringify(bestEconomicalSuperOver, null, 2), 'utf-8');

console.log('Result written to bowlerWithBestEcoInSuperOver.json');
