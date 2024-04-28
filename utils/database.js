const mongoose = require("mongoose");
require('dotenv').config()

const dbUrl = process.env.ATLAS_URL;

main().then(()=> {
    console.log("Connection Establish Successfully")
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

module.exports = main;