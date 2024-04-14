const mapData = [
  { lat: -34.397, lng: 150.644 },
  { lat: 40.7128, lng: -74.006 }, // Nova York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { lat: 41.8781, lng: -87.6298 }, // Chicago
  { lat: 29.7604, lng: -95.3698 }, // Houston
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
