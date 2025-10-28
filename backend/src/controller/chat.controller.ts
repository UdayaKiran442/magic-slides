import {
  createChatInDB,
  updateChatTitleInDB,
} from "../repository/chat.repository";
import { addMessageToDB } from "../repository/messages.repository";
import { storePresentationsInDB } from "../repository/presentations.repository";
import {
  ICreateChatSchema,
  IGeneratePresentationSchema,
} from "../route/chat.route";
import { generatePresentationService } from "../services/gemini.service";

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

export async function generatePresentation(
  payload: IGeneratePresentationSchema
) {
  try {
    // gemini llm api call to generate presentation slides along with chat title
    const response = await generatePresentationService(payload.prompt);
    // store generated slides in presentation collection
    await storePresentationsInDB({
      chatId: payload.chatId,
      slides: response.slides,
    });
    await updateChatTitleInDB({
      chatId: payload.chatId,
      title: response.title,
    });
  } catch (error) {
    throw new Error("Error generating presentation");
  }
}
