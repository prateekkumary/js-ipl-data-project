import fs from 'fs';

// Read the JSON file asynchronously
const deliveriesJSON = JSON.parse(fs.readFileSync(new URL('../public/output/deliveries.json', import.meta.url)));
const matchesJSON = JSON.parse(fs.readFileSync(new URL('../public/output/matches.json', import.meta.url)));

function getTopTenEcoBowler() {
    const matchId = [];
    for (const match of matchesJSON) {
        if (match.season === "2015") {
            matchId.push(match.id);
        }
    }
    let topTemEcoBowler = {};
    for (const delivery of deliveriesJSON) {
        let id=delivery.match_id;
        if (matchId.indexOf(id)!==-1) {
            let boweler = delivery.bowler;
            let run = Number.parseInt(delivery.total_runs);
            let wide = Number.parseInt(delivery.wide_runs);
            let noBall = Number.parseInt(delivery.noball_runs);
            let legBye=Number.parseInt(delivery.legbye_runs);
            let bye=Number.parseInt(delivery.bye_runs);

            // If the bowler doesn't exist, initialize it
            if (!topTemEcoBowler[boweler]) {
                topTemEcoBowler[boweler] = {};
            }
            if(!("run" in topTemEcoBowler[boweler])){
                topTemEcoBowler[boweler]["run"]=0;
            }
            if(!("bowl" in topTemEcoBowler[boweler])){
                topTemEcoBowler[boweler]["bowl"]=0;
            }
            if(run>0 ){
                if(legBye>0 || bye>0){
                    run =run-legBye;
                    run =run-bye;
                }
                else{
                    topTemEcoBowler[boweler]["run"]=topTemEcoBowler[boweler]["run"]+run;
                }
            }
            if(wide===0 && noBall==0){
                topTemEcoBowler[boweler]["bowl"]=topTemEcoBowler[boweler]["bowl"]+1;
            }
        }
    }
    return topTemEcoBowler;
}

const result =getTopTenEcoBowler();
const arr=[];
for(let res in result){
    let values = Object.values(result[res]);
    let run =values[0];
    let over=values[1]/6;
    let economy=run/over;
    economy=economy.toFixed(2);  
    arr.push({[res]:Number.parseFloat(economy)});
}

const sortedArr = arr.sort((a, b) => {
    // Extract the values (economy rate) from each object
    const valueA = Object.values(a)[0];
    const valueB = Object.values(b)[0];
    
    // Sort in ascending order
    return valueA - valueB;
});
const ans=sortedArr.slice(0,10);

fs.writeFileSync('./src/public/output/topTenEcoBowler.json', JSON.stringify(ans, null, 2), 'utf-8');
//topTemEcoBowler
console.log("Result written to topTenEcoBowler.lson");