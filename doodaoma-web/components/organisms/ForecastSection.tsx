import { ForecastData } from '../../types'
import { Loading } from '../atoms/Loading'
import { ForecastCard } from '../molecules/ForecastCard'

import { Section } from './Section'

type WeatherSectionProps = {
  content: ForecastData | null
}

export const ForecastSection = ({ content }: WeatherSectionProps) => {
  return (
    <Section className="col-span-2 max-h-[800px] overflow-y-scroll pt-0 lg:col-start-4 lg:row-span-2 lg:row-start-1">
      <>
        <div className="feed-card-header sticky top-0 mb-0 bg-gray-50 pb-3 pt-4 dark:bg-slate-800">
          Forecast
        </div>
        <div className="flex flex-col flex-nowrap gap-4 overflow-hidden">
          {content?.weatherList ? (
            <>
              {Object.entries(content.weatherList).map(([key, value]) => {
                return (
                  <div key={key}>
                    <div className="mb-2 font-semibold">{key}</div>
                    <div className="flex flex-nowrap gap-4 overflow-scroll ">
                      {value.map((ele) => (
                        <ForecastCard key={ele.id} data={ele} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </>
    </Section>
  )
}
