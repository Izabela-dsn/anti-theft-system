/* eslint-disable no-unused-vars */
import React from "react"
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"

const libraries = ["places"]

const mapStyles = {
  height: "70vh",
  width: "100%",
}

const MapContainer = ({ data }) => {
  const handleMapData = () => {
    const getCoord = []
    for (const information of data) {
      if (information.coords && Array.isArray(information.coords)) {
        for (const coord of information.coords) {
          getCoord.push(coord)
        }
      } else if (information.coords) {
        getCoord.push(information.coords)
      }
    }
    return getCoord
  }

  const mapData = handleMapData()
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "MY_API",
    libraries,
  })

  const defaultCenter = {
    lat: mapData[0].lat,
    lng: mapData[0].lng,
  }

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps</div>
  }

  return (
    <>
      <div className="map">
        <span>Mapa</span>
        {mapData ? (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
          >
            {mapData.map(({ lat, lng }, index) => {
              // console.log("Rendering marker", index, "at", location)
              return <MarkerF key={index} position={{ lat, lng }} />
            })}
          </GoogleMap>
        ) : null}
      </div>
    </>
  )
}

export default MapContainer
