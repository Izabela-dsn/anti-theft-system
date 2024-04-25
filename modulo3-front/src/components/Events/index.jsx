/* eslint-disable no-unused-vars */
import React from "react"
import CreateChart from "../../utils/Graph"
import "./style.css"

const Events = ({ data }) => {
  const handleEvents = () => {
    const getEvents = []
    for (const information of data) {
      for (const event of information.events) {
        const existingEvent = getEvents.find((e) => e.id === event.id)
        if (existingEvent) {
          existingEvent.qtdEventos.push(event.qtdEventos)
        } else {
          getEvents.push({ id: event.id, qtdEventos: [event.qtdEventos] })
        }
      }
    }
    return getEvents
  }

  return (
    <div className="events">
      <span>Eventos</span>
      {data ? <CreateChart data={handleEvents()} id={`data.length`} /> : null}
    </div>
  )
}
export default Events
