import { parentPort } from "worker_threads"
import { createSocket } from "dgram"
const dataList = [
  {
    URI: "100/10",
    idPKT: 1,
    idMU: 2,
    coords: { lat: -18.95, lng: -48.2177135942121 },
  },
  {
    URI: "100/11",
    idPKT: 1,
    idMU: [2],
    coords: [{ lat: -18.9607197471385, lng: -48.2177135942121 }],
  },
  {
    URI: "100/12",
    idPKT: 1,
    idMU: Math.floor(Math.random() * 26),
    typeOfEvent: "Alert",
  },
  {
    URI: "100/12",
    idPKT: 2,
    idMU: Math.floor(Math.random() * 26),
    typeOfEvent: "CurtCircuit",
  },
  {
    URI: "98/1",
    totalEvents: 28,
    events: [
      { id: 1, qtdEventos: 7 },
      { id: 2, qtdEventos: 21 },
    ],
  },
  {
    URI: "98/1",
    totalEvents: 28,
    events: [
      { id: 1, qtdEventos: 70 },
      { id: 2, qtdEventos: 210 },
    ],
  },
  {
    URI: "98/1",
    totalEvents: 28,
    events: [
      { id: 4, qtdEventos: 70 },
      { id: 2, qtdEventos: 210 },
    ],
  },
  {
    URI: "99/1",
    idPKT: 2,
    idMU: 1,
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
  },
  {
    URI: "99/1",
    idPKT: 5,
    idMU: 2,
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
  },
  {
    URI: "99/1",
    idPKT: 2,
    idMU: 1,
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
  },
]

let packetCount = 0
const server = createSocket("udp4")

server.on("error", (err) => {
  console.log(`server error:n${err.stack}`)
  server.close()
})

server.on("message", (msg, info) => {
  console.log(msg)
  // dataList.push(msg.toString())
  console.log(`server got: ${msg} the array is ${dataList}`)
  parentPort.postMessage(dataList)
  packetCount++
})

server.on("listening", function send() {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
  parentPort.postMessage(dataList) //just for testing purposes
})

server.bind(3333)
