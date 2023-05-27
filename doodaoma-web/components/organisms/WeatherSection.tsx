import { format } from 'date-fns'
import { TbSunrise, TbSunset } from 'react-icons/tb'

import { ForecastData, WeatherData } from '../../types'
import { Loading } from '../atoms/Loading'
import { ForecastCard } from '../molecules/ForecastCard'

import { Section } from './Section'

type WeatherSectionProps = {
  content: ForecastData | null
  weather: WeatherData | null
}

export const WeatherSection = ({ content, weather }: WeatherSectionProps) => {
  return (
    <Section>
      <>
        {content ? (
          <>
            <div className="feed-card-header">Weather Today</div>
            {weather ? <ForecastCard data={weather} /> : <Loading />}
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              <p className="flex items-center gap-x-2">
                <TbSunset className="h-6 w-6 text-red-400" />
                {format(content?.sunset, 'HH:mm aa')}
              </p>
              <p className="flex items-center gap-x-2">
                <TbSunrise className="h-6 w-6 text-red-400" />
                {format(content?.sunrise, 'HH:mm aa')}
              </p>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    </Section>
  )
}
