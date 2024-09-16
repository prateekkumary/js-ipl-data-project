//Number of matches won per team per year in IPL.


import fs, { read } from 'fs';
import path from 'path';
import csv from 'csv-parser';

const baseDirectory = process.cwd();

const matchesFilePath = path.join(baseDirectory, 'src', 'data', 'matches.csv');

const outputFolderPath = path.join(baseDirectory, 'src', 'public', 'output');



const matchesWonPerTeam = {};

function countMatchesWonPerTeam() {

    const readSteam = fs.createReadStream(matchesFilePath).pipe(csv());

    readSteam.on('data', function (row) {
        let season = row['season'];
        let winner = row['winner'];
        //console.log(winner);

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

    })
    // console.log(matchesWonPerTeam);
    // console.log(matchesWonPerTeam);
    readSteam.on('end', function () {
        outputResultToJson(matchesWonPerTeam)
    });

    readSteam.on('error', function (err) {
        console.log('Error reading file:', err)
    });


}

function outputResultToJson(data) {
    if (!fs.existsSync(outputFolderPath)) {
        fs.mkdir(outputFolderPath, { recursive: ture });
    }
    const outputFilePath = path.join(outputFolderPath, 'matchesWonPerTeam.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Result writen to matchesWonPerTeam.json');
}


function main() {
    countMatchesWonPerTeam();
}

main();