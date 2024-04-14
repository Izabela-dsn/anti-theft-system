const group = {}
const groupByIdIED = (IED) => {
  if (typeof IED === "string") {
    IED = JSON.parse(IED)
  }
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
  return group
}

const getGroup = () => {
  return group
}

export { groupByIdIED, getGroup }
