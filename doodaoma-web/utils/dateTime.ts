import crypto from 'crypto'

import {
  addMinutes,
  fromUnixTime,
  isBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns'

import { WeatherData } from '../types'

export const setTime = (x: Date, h = 0, m = 0, s = 0, ms = 0): Date => {
  return setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h)
}

export const generateDateTimeSlots = (date: Date) => {
  const from = setTime(date, 0)
  const to = setTime(date, 24)
  const stepMin = 120
  const step = (x: Date): Date => addMinutes(x, stepMin)
  const today = new Date()

  const blocks = []
  let cursor = from

  while (isBefore(cursor, to)) {
    if (isBefore(today, cursor)) {
      blocks.push({
        startTime: cursor,
        endTime: step(cursor),
      })
    }
    cursor = step(cursor)
  }
  return blocks
}

export const groupDate = (dateList: any[]) => {
  return dateList.reduce((acc: Record<string, WeatherData[]>, curr) => {
    const date = fromUnixTime(curr.dt).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    const uuid = crypto.randomBytes(16).toString('hex')
    acc[date].push({
      main: curr.weather[0].main,
      description: curr.weather[0].description,
      icon: curr.weather[0].icon,
      id: uuid,
      time: fromUnixTime(curr.dt),
    })
    return acc
  }, {})
}

export const groupReserveDate = (dateList: Date[]) => {
  return dateList.reduce((acc: Record<string, Date[]>, curr) => {
    const date = curr.toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(curr)
    return acc
  }, {})
}

export const timeDecimalToHMS = (timeDecimal: string) => {
  const hoursDecimal = timeDecimal.split('.')
  const hours = hoursDecimal[0] === '' ? '0' : hoursDecimal[0]
  const minutesFloat = parseFloat(`0.${hoursDecimal[1]}`) * 60
  const minutesDecimal = minutesFloat.toString().split('.')
  const minutes = minutesDecimal[0]
  const secondsFloat = parseFloat(`0.${minutesDecimal[1]}`) * 60
  const seconds = parseInt(secondsFloat.toString()).toString()
  return { hours, minutes, seconds }
}

export const degreesToDMS = (degs: string) => {
  const degreesDecimal = degs.split('.')
  const degrees = degreesDecimal[0] === '' ? '0' : degreesDecimal[0]
  const minutesFloat = parseFloat(`0.${degreesDecimal[1]}`) * 60
  const minutesDecimal = minutesFloat.toString().split('.')
  const minutes = minutesDecimal[0]
  const secondsFloat = parseFloat(`0.${minutesDecimal[1]}`) * 60
  const seconds = parseInt(secondsFloat.toString()).toString()
  return { degrees, minutes, seconds }
}
