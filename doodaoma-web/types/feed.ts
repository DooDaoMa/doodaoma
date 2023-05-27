export type MoonPhaseData = {
  imageUrl: string
}

export type ForecastData = {
  sunset: Date
  sunrise: Date
  weatherList: Record<string, WeatherData[]>
}

export type WeatherForecastResponse = {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  dt: number
}

export type WeatherData = {
  main: string
  description: string
  icon: string
  id: string
  time: Date
}

export type APODData = {
  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export type DSOQueryParams = {
  q?: string
  type?: string
  constellation?: string
  cat1?: string
}

export type IDSO = {
  ra: number
  dec: number
  id: number
  name: string
  cat1: string
}

export type DSOResponse = {
  fields: {
    id1: number
    dec: number
    ra: number
    name?: string
    cat1: string
  }
}
