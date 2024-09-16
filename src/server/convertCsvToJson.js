import csvtojson from 'csvtojson';
import fs from 'fs';
const matchesCsvfile = "./src/data/matches.csv";

const deliveriesCsvFile="./src/data/deliveries.csv";

csvtojson().fromFile(matchesCsvfile).then((json)=>{
    fs.writeFileSync("./src/public/output/matches.json",JSON.stringify(json,null,2),"utf-8",(err)=>{
        if(err){
            console.log(err);
        }
    })
})


csvtojson().fromFile(deliveriesCsvFile).then((json)=>{
    fs.writeFileSync("./src/public/output/deliveries.json",JSON.stringify(json,null,2),"utf-8",(err)=>{
        if(err){
            console.log(err);
        }
    })
})