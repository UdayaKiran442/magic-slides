import { Hono } from "hono";
import z from "zod";

import { createChat } from "../controller/chat.controller";

const chatRouter = new Hono();

const CreateChatSchema = z.object({
  prompt: z.string(),
});

export type ICreateChatSchema = z.infer<typeof CreateChatSchema> & {
  userId: string;
};

chatRouter.post("/create", async (c) => {
  try {
    const validation = CreateChatSchema.safeParse(await c.req.json());
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
      userId: "6900257679e5be4119666469",
    };
    const chat = await createChat(payload);
    return c.json({ success: true, chat }, 200);
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

const GeneratePresentationSchema = z.object({
  prompt: z.string(),
  chatId: z.string(),
});

export type IGeneratePresentationSchema = z.infer<
  typeof GeneratePresentationSchema
>;

chatRouter.post("/generate", async (c) => {
  try {
    const validation = GeneratePresentationSchema.safeParse(await c.req.json());
    if (!validation.success) {
      throw validation.error;
    }
    const payload = {
      ...validation.data,
    };
  } catch (error) {}
});

export default chatRouter;
