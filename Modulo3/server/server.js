// import { groupByIdIED as _groupByIdIED } from "./dataGraph.js"
import { createSocket } from "dgram"
const server = createSocket("udp4")

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on("message", (msg, rinfo) => {
  // console.log(msg)
  // let mensagemRecebida = msg.toString()
  // _groupByIdIED(mensagemRecebida)
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
})

server.on("listening", () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(1234) // server listening 0.0.0.0:1234
