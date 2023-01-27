import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Zone.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import 'leaflet/dist/leaflet.css'
import { getZoneMarkers } from "../features/zone/zoneSlice"
import MarkerData from "../features/zone/createMarker"

const position = [0, 0]

function Zone() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { markers } = useSelector((state) => state.zone)

  useEffect(() => {
    dispatch(getZoneMarkers(params.id.toLowerCase()))
    if(markers.length !== 0) {
      navigate(`/zone/${params.id.toLowerCase()}`)
      console.log(markers.length)
    } else {
      navigate('/')
      console.log(markers)
    }
  }, [])
  return (
    <div id="large">
      <MapContainer center={position} style={{ width: '75vw', height: '75vh' }} zoom={2} minZoom={2} maxZoom={4} scrollWheelZoom={true} maxBounds={[[-77, -177], [77, 177]]} id='mapContainer'>
        <TileLayer
          url="../mapTiles256/{z}_{x}_{y}.jpg"
          noWrap={true}
        />
        {markers.map((markerInfo) => (
          <MarkerData markerInfo={markerInfo} />
        ))}

      </MapContainer>
    </div>
  )
}

export default Zone