import { createSocket } from "dgram"
const client = createSocket("udp4")

let idDispositivo = 1
let Ia = 2
let Ib = 3
let Ic = 4
let numPacote = 5

let intervalo = 1000

setInterval(() => {
  let pacote = {
    idDispositivo: idDispositivo,
    Ia: Ia,
    Ib: Ib,
    Ic: Ic,
    numPacote: numPacote,
  }

  let mensagem = Buffer.from(JSON.stringify(pacote))

  client.send(mensagem, 12346, "127.0.0.1", (err) => {
    if (err) console.log(err)
    // Incrementa o número do pacote a cada envio
    numPacote++
  })
}, intervalo)
