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
  // { lat: -34.397, lng: 150.644 },
  // { lat: -19.0233, lng: -48.3348 },
  // { lat: -18.85, lng: -48.2 }, //novo mundo
  // { lat: -18.92389, lng: -48.29167 }, // centro
  // { lat: -18.98, lng: -48.37 }, // morada nova
  // { lat: -18.845, lng: -48.29167 }, // industrial/siqueiroli
  // { lat: -18.85, lng: -48.29167 },
  // { lat: -726.339, lng: -755.68 },
  // { lat: 40.7128, lng: -74.006 }, // Nova York
  // { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  // { lat: 41.8781, lng: -87.6298 }, // Chicago
  // { lat: 29.7604, lng: -95.3698 }, // Houston
]
window.initMap = async function () {
  try {
    const { Map } = await google.maps.importLibrary("maps")
    const { PinElement } = await google.maps.importLibrary("marker")
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
    let bounds = new google.maps.LatLngBounds()

    let map = new Map(document.querySelector(".map"), {
      center: { lat: mapData[0].lat, lng: mapData[0].lng },
      zoom: 10,
      mapId: "my_map",
    })

    for (let location of mapData) {
      let pinGlyph = new PinElement({
        background: "#EB3324",
        borderColor: "#EB3324",
      })
      let marker = new AdvancedMarkerElement({
        position: location,
        map: map,
        content: pinGlyph.element,
      })
      bounds.extend(marker.position)
    }

    map.fitBounds(bounds)
  } catch (error) {
    document.querySelector(
      ".map"
    ).innerHTML = `It's not possible to load. Error: ${error}`
  }
}
