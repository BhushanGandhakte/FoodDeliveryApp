const mongoose = require('mongoose');
const mongoURI = 'mongodb://vighneshkode18:vighnesh18@cluster0-shard-00-00.2qkgy.mongodb.net:27017,cluster0-shard-00-01.2qkgy.mongodb.net:27017,cluster0-shard-00-02.2qkgy.mongodb.net:27017/quick_bite?ssl=true&replicaSet=atlas-tme7zo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;

        // Fetch food_items
        const foodItemsCollection = db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();

        // Fetch foodCategory
        const foodCategoryCollection = db.collection("foodCategory");
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        // Store globally
        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        console.log("Food items and categories fetched successfully");

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
