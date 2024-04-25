import { parentPort } from "worker_threads"
import groupByIdIED from "./handleIEDdata.js"

const separatePerURI = (list) => {
  try {
    const listAlert = []
    const listMap = []
    const listMapMulti = []
    const listGraph = []
    const listGraphMed = []
    let groupMUData

    for (const element of list) {
      switch (element.URI) {
        case "100/12":
          listAlert.push(element)
          break
        case "100/10":
          listMap.push(element)
          break
        case "100/11":
          listMapMulti.push(element)
          break
        case "98/1":
          listGraph.push(element)
          break
        case "99/1":
          listGraphMed.push(element)
          groupMUData = groupByIdIED(listGraphMed)
          break
        default:
          console.log(`Sorry, we cannot find the URI ${element.URI}.`)
      }
    }
    // console.log(listAlert)
    // console.log(listMap)
    // console.log(groupMUData)
    // console.log({ listAlert, listMap, listGraph, groupMUData })
    return { listAlert, listGraph, listMap, groupMUData, listMapMulti }
  } catch (error) {
    console.log("something is wrong: ", error)
  }
}

parentPort.on("message", (data) => {
  const result = separatePerURI(data)
  parentPort.postMessage(result)
  console.log("worked")
})

parentPort.on("error", (error) => {
  console.error("Erro no worker:", error)
})
