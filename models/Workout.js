import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    type: String,
    duration: Number,
    caloriesBurned: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model.Workout || mongoose.model("Workout", WorkoutSchema);
