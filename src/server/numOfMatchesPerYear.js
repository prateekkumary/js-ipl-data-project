//Number of matches played per year for all the years in IPL.


import fs, { read } from 'fs';
import path from 'path';
import csv from 'csv-parser';


const baseDirectory = process.cwd();

const matchesFilePath = path.join(baseDirectory, 'src', 'data', 'matches.csv');

const outputFolderPath=path.join(baseDirectory,'src','public','output');



const matchPerYear={};

function countMatchesPerYear(){

    const readSteam=fs.createReadStream(matchesFilePath).pipe(csv());

    readSteam.on('data',function(row){
        const season=row['season'];

        if(matchPerYear[season]){
            matchPerYear[season]++;
        }
        else{
            matchPerYear[season]=1;
        }
    });
    readSteam.on('end' ,function(){
        outputResultToJson(matchPerYear);
    });
    readSteam.on('error', function(err){
        console.log('Error reading file:',err);
    })
    
}
function outputResultToJson(data){

    if(!fs.existsSync(outputFolderPath)){
        fs.mkdir(outputFolderPath,{recursive:true});
    }
    const outputFilePath=path.join(outputFolderPath,'matchPerYear.json');

   fs.writeFileSync(outputFilePath,JSON.stringify(data,null,2),'utf-8');
   console.log('Result writen to matchPerYear.json');
}

function main(){
    countMatchesPerYear();
}


main();