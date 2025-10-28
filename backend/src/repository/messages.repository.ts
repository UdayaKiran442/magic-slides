import Message from "../repository/schema/messages.schema";

export async function addMessageToDB(payload: {
  chatId: string;
  senderId: string;
  prompt: string;
}) {
  try {
    const message = await Message.create({
      chatId: payload.chatId,
      senderId: payload.senderId,
      prompt: payload.prompt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await message.save();
    return message;
  } catch (error) {
    throw new Error("Error adding message to DB");
  }
}
