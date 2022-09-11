import mongoose from "mongoose";

const PhotoSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    uploadedAt: { type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    link: { type: String, required:true },
    public_id: { type: String, required:true }
})

export default mongoose.model('Photo', PhotoSchema);