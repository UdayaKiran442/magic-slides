import { Hono } from 'hono'

import  './repository/db'

import chatRouter from './route/chat.route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/chat', chatRouter);

export default app
