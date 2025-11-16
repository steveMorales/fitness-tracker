import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    userId: String,
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    date: { type: Date, default: Date.now },
});

// Makes sure mongoose does NOT create the same model twice -> this would error out in Next.js during hot reloads
//exports existing Meal Model if it exists OTHERWISE it creates a new one
export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);