import { ICreateChatSchema } from "../route/chat.route";

import Chat from "../repository/schema/chat.schema";

export async function createChatInDB(payload: ICreateChatSchema) {
  try {
    const chat = await Chat.create({
      userId: payload.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await chat.save();
    return chat;
  } catch (error) {
    throw new Error("Error creating chat");
  }
}

export async function updateChatTitleInDB(payload: {
  chatId: string;
  title: string;
}) {
  try {
    const chat = await Chat.findByIdAndUpdate(payload.chatId, {
      title: payload.title,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw new Error("Error updating chat title");
  }
}
