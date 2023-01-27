import axios from 'axios'

const API_URL = '/api/zone/'

const getZoneMarkers = async (zoneID) => {
  const response = await axios.get(API_URL + zoneID)
  if(response.data) {
    localStorage.setItem('markers', JSON.stringify(response.data))
  }
  return response.data
}

const zoneService = {
  getZoneMarkers
}

export default zoneService