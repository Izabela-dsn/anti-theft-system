const http = require("http")
const socketIo = require("socket.io")
const dgram = require("dgram")

const httpServer = http.createServer()
const io = socketIo(httpServer)
const udpServer = dgram.createSocket("udp4")

io.on("connection", (socket) => {
  console.log("Novo cliente conectado")

  udpServer.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
    let menssagemRecebida = msg.toString()
    let group = groupByIdIED(menssagemRecebida)
    socket.emit("groupData", group)
  })
})

udpServer.bind(12346) // Substitua 41234 pela porta UDP que você deseja ouvir
httpServer.listen(5500, () => console.log("Servidor rodando na porta 5500"))
