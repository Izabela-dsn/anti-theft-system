/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
import MapContainer from "./components/Map"
import Header from "./components/Header"
import LineChart from "./components/Graph"
import Alerts from "./components/Alerts"
import Events from "./components/Events"
import "./App.css"

const mapData = [
  { lat: -18.9607197471385, lng: -48.2177135942121 },
  { lat: -18.8898258113208, lng: -48.2153960258958 },
  { lat: -18.8571191244419, lng: -48.306508415079 },
  { lat: -18.8842470683364, lng: -48.2138149274903 },
  { lat: -18.9255638301678, lng: -48.2025608844601 },
  { lat: -18.883103275254, lng: -48.2585979405598 },
  { lat: -18.8637056041666, lng: -48.2407892088735 },
  { lat: -18.921589019723, lng: -48.3634875610394 },
  { lat: -18.871529370114, lng: -48.3592075073576 },
  { lat: -18.9714776912432, lng: -48.3294671433417 },
  { lat: -18.9435283344442, lng: -48.3154841632189 },
]

const group = {
  IED1: [
    {
      URI: "99/1",
      idPKT: 2,
      idMU: 1,
      Ia: 1.412354154631159,
      Ib: 6.635148683251099,
      Ic: 7.337661041752021,
    },
    {
      URI: "99/1",
      idPKT: 3,
      idMU: 1,
      Ia: 1.412354154631159,
      Ib: 6.635148683251099,
      Ic: 7.337661041752021,
    },
  ],
  IED2: [
    {
      URI: "99/1",
      idPKT: 2,
      idMU: 1,
      Ia: 1.412354154631159,
      Ib: 6.635148683251099,
      Ic: 7.337661041752021,
    },
    {
      URI: "99/1",
      idPKT: 2,
      idMU: 1,
      Ia: 1.9,
      Ib: 6.99,
      Ic: 7.5021,
    },
  ],
  IED3: [
    {
      URI: "99/1",
      idPKT: 2,
      idMU: 1,
      Ia: 8,
      Ib: 6,
      Ic: 7.752021,
    },
    {
      URI: "99/1",
      idPKT: 2,
      idMU: 1,
      Ia: 8,
      Ib: 6,
      Ic: 21,
    },
  ],
}

// const alertData = [
//   {
//     URI: "100/12",
//     idPKT: 1,
//     idMU: Math.floor(Math.random() * 26),
//     typeOfEvent: "Alert",
//   },
//   {
//     URI: "100/12",
//     idPKT: 2,
//     idMU: Math.floor(Math.random() * 26),
//     typeOfEvent: "CurtCircuit",
//   },
//   {
//     URI: "100/12",
//     idPKT: 3,
//     idMU: Math.floor(Math.random() * 26),
//     typeOfEvent: "CurtCircuit",
//   },
//   {
//     URI: "100/12",
//     idPKT: 4,
//     idMU: Math.floor(Math.random() * 26),
//     typeOfEvent: "Alert",
//   },
// ]

// const eventData = [
//   {
//     // idPKT: 1,
//     URI: "98/1",
//     totalEvents: 28,
//     events: [
//       { id: 1, qtdEventos: 7 },
//       { id: 2, qtdEventos: 21 },
//     ],
//   },
//   {
//     // idPKT: 2,
//     URI: "98/1",
//     totalEvents: 280,
//     events: [
//       { id: 3, qtdEventos: 70 },
//       { id: 4, qtdEventos: 210 },
//     ],
//   },
//   {
//     // idPKT: 2,
//     URI: "98/1",
//     totalEvents: 280,
//     events: [
//       { id: 1, qtdEventos: 70 },
//       { id: 2, qtdEventos: 210 },
//     ],
//   },
//   {
//     // idPKT: 2,
//     URI: "98/1",
//     totalEvents: 280,
//     events: [
//       { id: 3, qtdEventos: 90 },
//       { id: 2, qtdEventos: 240 },
//     ],
//   },
//   {
//     // idPKT: 3,
//     URI: "98/1",
//     totalEvents: 0,
//     events: [],
//   },
// ]

function App() {
  const [data, setData] = useState(null)
  const [listiAlert, setlistiAlert] = useState(null)
  const [eventi, setEventi] = useState(null)
  const [mapi, setMapi] = useState(null)
  const [muData, setMuData] = useState(null)

  useEffect(() => {
    const socket = io("http://localhost:8000")
    socket.on("connect", () => {
      console.log("yes")
    })

    socket.on("message", (receivedData) => {
      console.log("yes 2")
      setData(receivedData)
    })

    // Limpeza na desmontagem
    return () => {
      socket.off("data")
    }
  }, [])

  data ? console.log(data) : null
  useEffect(() => {
    if (data) {
      setlistiAlert(data.listAlert)
      setEventi(data.listGraph)
      data.listMapMulti
        ? setMapi(data.listMap.concat(data.listMapMulti))
        : setMapi(data.listMap)
      setMuData(data.groupMUData)
    }
  }, [data])

  data ? console.log(mapi) : null

  return (
    <>
      <Header></Header>
      {data ? (
        <div className="container">
          <div className="graphs">
            <div className="headerGraphs">
              <span>Gráficos</span>
              <div className="filterIED">
                <input type="text" />
                <button>Filtrar</button>
              </div>
            </div>
            <div className="graphsIED">
              {Object.entries(group).map(([ied, data], index) => (
                <div className="chart" key={ied}>
                  <span>{ied}</span>
                  <LineChart data={data} id={`chart-${index}`} />
                </div>
              ))}
            </div>
          </div>
          {mapi ? <MapContainer data={mapi} /> : <>Carregando Mapa...</>}
          {listiAlert ? <Alerts data={listiAlert} /> : <>Carregando ...</>}
          {eventi ? <Events data={eventi} /> : <>Carregando ...</>}
          <h1>Dados Recebidos</h1>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      ) : (
        <>Carregando</>
      )}
    </>
  )
}

export default App
