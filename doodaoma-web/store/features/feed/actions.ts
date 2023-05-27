/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAction,
  createAsyncThunk as nativeCreateAsyncThunk,
} from '@reduxjs/toolkit'

import {
  loadAPOD,
  loadDSO,
  loadMoonPhase,
  loadWeather,
  loadForecast,
} from '../../../services/apis'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const setMoonPhase = createAction('feed/setMoonPhase')
export const setWeather = createAction('feed/setWeather')

export const fetchDSOData = createAsyncThunk({
  api: loadDSO,
  EVENT_NAME: 'load dso data',
})

export const fetchWeather = createAsyncThunk({
  api: loadWeather,
  EVENT_NAME: 'loadWeatherAPI',
})

export const fetchMoonPhase = createAsyncThunk({
  api: loadMoonPhase,
  EVENT_NAME: 'loadMoonPhaseAPI',
})

export const fetchForecast = createAsyncThunk({
  api: loadForecast,
  EVENT_NAME: 'loadForecastAPI',
})

export const fetchFeedContent = nativeCreateAsyncThunk(
  'feed/load',
  async (_, { rejectWithValue }) => {
    try {
      const moonPhaseRes = await loadMoonPhase()
      const apodRes = await loadAPOD()

      const moonPhaseData = moonPhaseRes?.data.data
      const apodData = apodRes?.data

      return {
        moonPhase: moonPhaseData,
        apod: apodData,
      }
    } catch (error: any) {
      const status = error?.response?.status || 404
      const data = error?.response?.data
      return rejectWithValue({ status, data })
    }
  },
)

export const resetFeedContent = createAction('feed/reset')
