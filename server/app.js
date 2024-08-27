import express from 'express'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)

export default app;