import { Hono } from 'hono'

import  './repository/db'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
