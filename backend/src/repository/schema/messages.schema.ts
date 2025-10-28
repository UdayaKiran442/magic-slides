import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    presentationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation",
        required: false
    }
})

export default mongoose.model("Message", messageSchema);
