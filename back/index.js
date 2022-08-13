const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("entrar_sala", data => {
    socket.join(data.idSala)
    console.log(`ID user: ${socket.id} Sala: ${JSON.stringify(data)}`)
  })

  socket.on("send_message", data => {
    socket.to(data.sala).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
  })
})

server.listen(3001, () => {
  console.log("SERVER RUNNING")
})
