import { Hono } from "hono";

import "./repository/db";

import chatRouter from "./route/chat.route";
import { generatePresentationService } from "./services/gemini.service";

const app = new Hono();

app.get("/", async (c) => {
  const response = await generatePresentationService(
    "Prepare slides on topic: 'How to start a startup'"
  );
  return c.json(response);
});

app.route("/chat", chatRouter);

Bun.serve({
  port: 3000,
  idleTimeout: 60,
  fetch(req) {
    // Your request handling logic here
    return new Response("Hello Bun!");
  },
});

export default app;
