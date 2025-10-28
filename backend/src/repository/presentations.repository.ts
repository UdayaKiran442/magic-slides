import Presentation from "../repository/schema/presentation.schema";

export async function storePresentationsInDB(payload: {
  chatId: string;
  slides: any[];
}) {
  try {
    const presentation = await Presentation.create({
      chatId: payload.chatId,
      slides: payload.slides,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await presentation.save();
  } catch (error) {
    throw new Error("Error storing presentations");
  }
}
