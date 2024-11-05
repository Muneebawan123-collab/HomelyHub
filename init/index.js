const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure that this contains your data.
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // Delete existing data
  initData.data = initData.data.map((obj) => ({...obj, owner: "6723bd0b6f7ab2a0b786b8da"}));
  await Listing.insertMany(initData.data); // Insert new data
  console.log(initData.data);
  console.log("Data was reinitialized");
};

// Call the function to reinitialize the database
initDB();
