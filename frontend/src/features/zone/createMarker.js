import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { FaHouseUser } from 'react-icons/fa'
import { useDispatch } from "react-redux"
import { getZoneMarkers } from "../../features/zone/zoneSlice"
import { useNavigate } from "react-router-dom"
const iconImage = require('../../constants/iconConstants')


function getIcon(markerInfo) {
  return L.icon({
    iconUrl: require(`../../media/icons/${iconImage[markerInfo.type]}.jpg`),
    iconSize: new L.point(20, 20)
  })
}

function MarkerData({ markerInfo }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    const subzone = markerInfo.subzone

    dispatch(getZoneMarkers(subzone))
    navigate(`/zone/${subzone}`)
  }
  return (
    <Marker
      position={[markerInfo.coordinates.y, markerInfo.coordinates.x]}
      key={markerInfo._id}
      icon={getIcon(markerInfo)}>
      <Popup>
        Name: {markerInfo.name} <br />
        Coordinates: <br />
        X: {markerInfo.coordinates.x} <br />
        Y: {markerInfo.coordinates.y} <br />
        {markerInfo.subzone ? (
          <Link to={`/zone/${markerInfo.subzone}`}>
            <button type="button" className="btn" onClick={onClick}> <FaHouseUser /> Go to the zone of {markerInfo.name} </button>
          </Link>
        ) : (
          <></>
        )}
      </Popup>
    </Marker>
  )
}

export default MarkerData