import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    uploadedAt: { type: Date, default: Date.now}
})

export default mongoose.model('Photo', PhotoSchema);