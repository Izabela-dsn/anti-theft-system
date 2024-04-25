/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const CreateChart = ({ data, id }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(id, {
      type: "line",
      data: {
        labels: Array(Math.max(...data.map((item) => item.qtdEventos.length)))
          .fill()
          .map((_, index) => ` ${index + 1}`),
        datasets: data.map((item, index) => ({
          label: `ID ${item.id}`,
          data: item.qtdEventos,
          borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          }, 1)`,

          fill: false,
        })),
      },
    })
  }, [data, id])
  return <canvas id={id} />
}

export default CreateChart
