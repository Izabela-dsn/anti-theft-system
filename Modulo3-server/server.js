import { Worker } from "worker_threads"
import { createServer } from "http"
import { Server } from "socket.io"
import express from "express"
import cors from "cors"

// Constantes
const CORS_OPTIONS = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
const PORT = 8000

// Configuração do servidor Express
const app = express()
app.use(cors(CORS_OPTIONS))

// Configuração do servidor HTTP e Socket.io
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: CORS_OPTIONS })

// Workers
const workerReceivePct = new Worker("./workerReceivePct.js")
const workerHandleData = new Worker("./handlePacketsWorker.js")

// Manipulação de eventos
workerReceivePct.on("message", (pacts) => {
  workerHandleData.postMessage(pacts)
})

workerHandleData.on("message", (data) => {
  io.emit("message", data)
  console.log("Data emitted to clients")
})

io.on("connection", (socket) => {
  workerHandleData.on("message", (data) => {
    socket.emit("message", data)
    console.log("Data emitted to clients")
  })
  // socket.emit("message", data)
  console.log("Client connected")
})

// Iniciar o servidor
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
