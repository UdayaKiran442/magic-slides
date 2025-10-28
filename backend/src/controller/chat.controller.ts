import { createChatInDB } from "../repository/chat.repository";
import { addMessageToDB } from "../repository/messages.repository";
import { ICreateChatSchema } from "../route/chat.route";

export async function createChat(payload: ICreateChatSchema) {
  try {
    // create chat in db
    const chat = await createChatInDB(payload);
    // add message in messages collection
    await addMessageToDB({
      chatId: chat.id,
      senderId: payload.userId,
      prompt: payload.prompt,
    });
    return chat;
  } catch (error) {
    throw new Error("Error creating chat");
  }
}
