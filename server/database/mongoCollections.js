const { connectToDatabase } = require("./mongoConnection");

let collections = {};

const initializeCollections = async () => {
  const db = await connectToDatabase();
  collections.termsCollection = db.collection("TierLists");
  console.log("Collections initialized");
};

module.exports = { initializeCollections, collections };
