const mongoose = require("mongoose");
const initData = require("./data.js"); // This should export 'data' correctly
const Listing = require("../models/listing.js"); // Ensure the path is correct

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB URL

// Establish connection to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
    initDB(); // Initialize data after successful DB connection
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });

// Connect to MongoDB
async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Function to initialize the database
const initDB = async () => {
  try {
    // Delete all existing documents in the collection
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "652d0081ae547c5d37e56b5f"}));
    console.log("Old data deleted");

    // Insert new data from initData
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Error during DB initialization:", err);
  }
};
