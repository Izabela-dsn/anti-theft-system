/* eslint-disable no-unused-vars */
import React from "react"
import Alert from "../../assets/icons/alert-yellow.svg"
import CurtCircuit from "../../assets/icons/alert-red.svg"
import "./style.css"

const Alerts = ({ data }) => {
  const time = new Date()

  return (
    <div className="alerts">
      <span>Alertas</span>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Mensagem</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((dataInfo) => {
                return (
                  <>
                    <tr>
                      <th>
                        <img
                          src={
                            dataInfo.typeOfEvent === "Alert"
                              ? Alert
                              : CurtCircuit
                          }
                          alt={
                            dataInfo.typeOfEvent === "Alert"
                              ? "Alerta"
                              : "Curto Circuito"
                          }
                        />
                      </th>
                      <td>{dataInfo.idPKT}</td>
                      <th scope="row">
                        Evento no dispositivo {dataInfo.idMU}:{" "}
                        {dataInfo.typeOfEvent === "Alert"
                          ? "Alerta"
                          : "Curto Circuito"}
                      </th>
                      <td>
                        {time.getHours()}:{time.getMinutes()}:
                        {time.getSeconds()}
                      </td>
                    </tr>
                  </>
                )
              })
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default Alerts
