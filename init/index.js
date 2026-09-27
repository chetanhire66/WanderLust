const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    mongoose.connect(mongoUrl);
}

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

const initDB = async()=>{
    await Listing.deleteMany();
    initData.data = initData.data.map((obj)=> ({ ...obj, owner: "6ab36b8aaacbed0836120055"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB()
.then(()=>{
    console.log("Done");
})