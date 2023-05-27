import { createReducer } from '@reduxjs/toolkit'
import { fromUnixTime } from 'date-fns'

import {
  ErrorTypes,
  MoonPhaseData,
  APODData,
  IDSO,
  DSOResponse,
  ForecastData,
  WeatherData,
} from '../../../types'
import { groupDate } from '../../../utils/dateTime'

import {
  fetchDSOData,
  fetchFeedContent,
  fetchWeather,
  resetFeedContent,
  fetchForecast,
} from './actions'

interface InitialStateProps {
  moonPhase: MoonPhaseData | null
  forecastData: ForecastData | null
  weatherData: WeatherData | null
  apod: APODData | null
  dsoList: IDSO[] | null
  loadContentState: {
    status: string
    error: ErrorTypes | null
  }
  loadDSOListState: {
    status: string
    error: ErrorTypes | null
  }
  loadForecastState: {
    status: string
    error: ErrorTypes | null
  }
  loadWeatherState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  moonPhase: null,
  forecastData: null,
  weatherData: null,
  apod: null,
  dsoList: null,
  loadContentState: {
    status: 'idle',
    error: null,
  },
  loadDSOListState: {
    status: 'idle',
    error: null,
  },
  loadForecastState: {
    status: 'idle',
    error: null,
  },
  loadWeatherState: {
    status: 'idle',
    error: null,
  },
}

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchFeedContent.pending, (state) => {
      state.loadContentState.status = 'loading'
      state.loadContentState.error = null
    })
    .addCase(fetchFeedContent.fulfilled, (state, { payload }) => {
      state.loadContentState.status = 'success'
      state.moonPhase = payload.moonPhase
      state.apod = payload.apod
    })
    .addCase(fetchFeedContent.rejected, (state, { payload }) => {
      state.loadContentState.status = 'error'
      state.loadContentState.error = payload as ErrorTypes
    })
    .addCase(fetchDSOData.pending, (state) => {
      state.loadDSOListState.status = 'loading'
      state.loadDSOListState.error = null
    })
    .addCase(fetchDSOData.fulfilled, (state, { payload }) => {
      state.dsoList = payload?.records?.map((record: DSOResponse) => ({
        ra: record?.fields?.ra,
        dec: record?.fields?.dec,
        id: record?.fields?.id1,
        name: record?.fields?.name,
        cat1: record?.fields?.cat1,
      }))
      state.loadDSOListState.status = 'success'
    })
    .addCase(fetchDSOData.rejected, (state, { payload }) => {
      state.loadDSOListState.status = 'error'
      state.loadDSOListState.error = payload as ErrorTypes
    })
    .addCase(fetchWeather.pending, (state) => {
      state.loadWeatherState.status = 'loading'
      state.loadWeatherState.error = null
    })
    .addCase(fetchWeather.fulfilled, (state, { payload }) => {
      state.loadWeatherState.status = 'success'
      state.weatherData = {
        ...payload.weather[0],
        time: fromUnixTime(payload.dt),
      }
    })
    .addCase(fetchWeather.rejected, (state, { payload }) => {
      state.loadDSOListState.status = 'error'
      state.loadDSOListState.error = payload as ErrorTypes
    })
    .addCase(fetchForecast.pending, (state) => {
      state.loadForecastState.status = 'loading'
      state.loadForecastState.error = null
    })
    .addCase(fetchForecast.fulfilled, (state, { payload }) => {
      state.loadForecastState.status = 'success'
      state.forecastData = {
        sunset: fromUnixTime(payload.city.sunset),
        sunrise: fromUnixTime(payload.city.sunrise),
        weatherList: groupDate(payload.list),
      }
    })
    .addCase(fetchForecast.rejected, (state, { payload }) => {
      state.loadForecastState.status = 'error'
      state.loadForecastState.error = payload as ErrorTypes
    })
    .addCase(resetFeedContent, (state) => {
      state.moonPhase = null
      state.forecastData = null
    })
})
