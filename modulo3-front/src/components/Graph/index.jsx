/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const LineChart = ({ data, id }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(id, {
      type: "line",
      data: {
        labels: data.map((_, index) => ` ${index + 1}`),
        datasets: [
          {
            label: "Ia",
            data: data.map((item) => item.Ia),
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
          },
          {
            label: "Ib",
            data: data.map((item) => item.Ib),
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Ic",
            data: data.map((item) => item.Ic),
            borderColor: "rgba(153, 102, 255, 1)",
            fill: false,
          },
        ],
      },
    })
  }, [data, id])

  return <canvas id={id} />
}

export default LineChart
