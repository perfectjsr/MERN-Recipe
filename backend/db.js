const mongoose = require('mongoose');
const dotenv = require("dotenv").config(); 
const mongoURI = process.env.MONGODB_URL;

const foodItemSchema = new mongoose.Schema({
  // Define your schema fields here like below
  CategoryName: String,
  name: String,
  description: String,
  // Add more fields as needed
});

const FoodItem = mongoose.model('food-item', foodItemSchema);

// Define schema for the "foodCategory" collection
const foodCategorySchema = new mongoose.Schema({
  CategoryName: String,
});

const FoodCat = mongoose.model('foodcategories',foodCategorySchema);

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection done');
    // Use the Mongoose model to fetch data
    const fetched_data = await FoodItem.find({});
    global.food_items = fetched_data;
    // Use the Mongoose model to fetch data
    const fetched_catdata = await FoodCat.find({});
    global.foodCategory = fetched_catdata;
    // console.log(global.foodCategory)
    console.log("fetched the data above");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;