import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import zoneService from "./zoneService"

const initialState = {
  markers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const getZoneMarkers = createAsyncThunk('getZoneMarkers', async (zoneID, thunkAPI) => {
  try {
    return await zoneService.getZoneMarkers(zoneID)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const zoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getZoneMarkers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getZoneMarkers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.markers = null
      })
      .addCase(getZoneMarkers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.markers = action.payload
      })
  }
})

export const { reset } = zoneSlice.actions
export default zoneSlice.reducer