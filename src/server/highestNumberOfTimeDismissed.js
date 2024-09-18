//Find the highest number of times one player has been dismissed by another player

import fs from 'fs';

// Read JSON files
const deliveriesJSON = JSON.parse(fs.readFileSync(new URL('../public/output/deliveries.json', import.meta.url)));

// Function to find the player who has been dismissed the most by each bowler
function highestDismissalsBetweenPlayers() {
    const mostTimeDismissedByBowler = {};

    for (const delivery of deliveriesJSON) {
        const { player_dismissed, dismissal_kind, bowler } = delivery;

        // Initialize bowler in the result object if not present
        if (player_dismissed && dismissal_kind !== 'run out') {
            if (!mostTimeDismissedByBowler[bowler]) {
                mostTimeDismissedByBowler[bowler] = [];
            }
            mostTimeDismissedByBowler[bowler].push(player_dismissed);
        }
    }

    return mostTimeDismissedByBowler;
}

// Get the most dismissed player by each bowler
const mostTimeDismissedByBowler = highestDismissalsBetweenPlayers();

let bowler = '';
let mostDismissedPlayer = '';
let occurrences = 0;

for (const [currentBowler, dismissedPlayers] of Object.entries(mostTimeDismissedByBowler)) {
    const mostOccurring = dismissedPlayers.reduce((acc, player) => {
        acc[player] = (acc[player] || 0) + 1;
        return acc;
    }, {});

    const [currentMostDismissedPlayer, currentOccurrences] = Object.entries(mostOccurring).reduce(
        (max, entry) => (entry[1] > max[1] ? entry : max),
        ['', 0]
    );

    if (currentOccurrences > occurrences) {
        mostDismissedPlayer = currentMostDismissedPlayer;
        bowler = currentBowler;
        occurrences = currentOccurrences;
    }
}

// Create and write the result to a JSON file
const result = {
    [bowler]: {
        player_name: mostDismissedPlayer,
        dismissed: occurrences
    }
};

fs.writeFileSync('./src/public/output/highestNumberOfTimeDismissed.json', JSON.stringify(result, null, 2), 'utf-8');

console.log('Result written to highestNumberOfTimeDismissed.json');
