// const socket = io('http://localhost:3000');
const displayGraphs = document.querySelector(".graphsIED")
const displayAlerts = document.querySelector("tbody")
const group = {}

const IEDData = [
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: Math.floor(Math.random() * 26),
    Ia: Math.random() * 10,
    Ib: Math.random() * 10,
    Ic: Math.random() * 10,
    numPacote: Math.floor(Math.random() * 1000),
  },
  {
    idDispositivo: 3,
    Ia: 10,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 1,
    Ia: 10,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 1,
    Ia: 50,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 2,
    Ia: 10,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 4,
    Ia: 40,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 3,
    Ia: 10,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
  {
    idDispositivo: 2,
    Ia: 10,
    Ib: 10,
    Ic: 20,
    numPacote: 100,
  },
]
const alertData = [
  {
    id: 1,
    typeOfEvent: "Warning",
    id_IED: Math.floor(Math.random() * 26),
  },
  {
    id: 2,
    typeOfEvent: "Warning",
    id_IED: Math.floor(Math.random() * 26),
  },
  {
    id: 3,
    typeOfEvent: "Warning",
    id_IED: Math.floor(Math.random() * 26),
  },
  {
    id: 4,
    typeOfEvent: "Curto Circuito",
    id_IED: Math.floor(Math.random() * 26),
  },
]

function loadGraph(data, key) {
  let ctx = document.querySelector(`.myChart${key}`).getContext("2d")
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((item) => item.idDispositivo),
      datasets: [
        {
          label: "Ia",
          data: data.map((item) => item.Ia),
          backgroundColor: "#325B9A",
          borderColor: "#325B9A",
          borderWidth: 1,
        },
        {
          label: "Ib",
          data: data.map((item) => item.Ib),
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Ic",
          data: data.map((item) => item.Ic),
          backgroundColor: "#61616B",
          borderColor: "#61616B",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugin: {
        title: {
          display: true,
          text: "oi",
        },
      },
    },
  })
}

const generateGraphs = (groupOfDataFromIED) => {
  // a cada id diferente gerar um gráfico
  console.log(groupOfDataFromIED)
  for (let [key, value] of Object.entries(groupOfDataFromIED)) {
    const newCanvas = document.createElement("canvas")
    newCanvas.id = key
    newCanvas.classList.add(`myChart${key}`, "chart")
    displayGraphs.appendChild(newCanvas)
    loadGraph(value, key)
  }
}

const groupByIdIED = (data) => {
  data.forEach((IED) => {
    // identificar o id
    let key = `IED${IED.idDispositivo}`
    // verificar se ja existe vetor com o numero do id - IED${1}
    if (group.hasOwnProperty(key)) {
      // se já dá um append no vetor
      group[key].push(IED)
    } else {
      // se não cria um vetor e dá um append
      group[key] = [IED]
    }
    console.log("dados", group)
  })
  return group
}

// generate alerts
// show the data in a table format
const showAlerts = (data) => {
  //create a new tr
  data.forEach((alert) => {
    console.log(alert)
    let now = new Date()
    if (alert.typeOfEvent === "Warning") {
      let newTr = `
      <tr>
        <th>
          <img src="./assets/icons/mingcute_alert-fill.svg" alt="" />
        </th>
        <td>${alert.id}</td>
        <th scope="row">Alerta dispositivo ${alert.id_IED}</th>
        <td>${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</td>
      </tr>
      `
      displayAlerts.innerHTML += newTr
    } else if (alert.typeOfEvent === "Curto Circuito") {
      let newTr = `
      <tr>
        <th>
          <img src="./assets/icons/mingcute_alert-fill-red.svg" alt="" />
        </th>
        <td>${alert.id}</td>
        <th scope="row">Curto circuito dispositivo ${alert.id_IED}</th>
        <td>${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</td>
      </tr>
      `
      displayAlerts.innerHTML += newTr
    }
  })
}

generateGraphs(groupByIdIED(IEDData))
showAlerts(alertData)
