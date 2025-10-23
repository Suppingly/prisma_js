import express from 'express'
import { PrismaClient } from "./generated/prisma/index.js"
import router from "./router/userRouter.js"

const app = express()
export const prisma = new PrismaClient()
app.use(express.json())

app.use('/api',router)

export default app