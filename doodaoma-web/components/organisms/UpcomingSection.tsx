import {
  addDays,
  format,
  formatDistanceToNow,
  parseJSON,
  startOfToday,
} from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { loadTimeSlot } from '../../services/apis'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { ITimeSlot } from '../../types'
import { Button } from '../atoms/Button'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

export const UpcomingSection = () => {
  const router = useRouter()
  const { currentUser } = useAppSelector(userSelector)
  const [upcoming, setUpcoming] = useState<ITimeSlot[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (currentUser?.username) {
      setIsLoading(true)
      const loadUpcoming = async () => {
        const res = await loadTimeSlot({
          startTime: startOfToday(),
          endTime: addDays(startOfToday(), 7),
          username: currentUser?.username,
          status: 'reserved',
        })
        setUpcoming(res.data.data)
        setIsLoading(false)
      }
      loadUpcoming()
    }
  }, [])
  return (
    <Section>
      <>
        <div className="feed-card-header">Upcoming Reservation</div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!isLoading && upcoming.length > 0 ? (
              <>
                <p>
                  Next in{' '}
                  {formatDistanceToNow(parseJSON(upcoming[0]?.startTime))}
                </p>
                <p>
                  {format(parseJSON(upcoming[0]?.startTime), 'dd E HH:mm aa')}{' '}
                  to <br />
                  {format(
                    parseJSON(upcoming[upcoming.length - 1]?.endTime),
                    'dd E HH:mm aa',
                  )}
                </p>
              </>
            ) : (
              <>
                <p className="my-4 text-center dark:text-slate-200">
                  No upcoming reservation
                </p>
                <Button onClick={() => router.push('/reservation')}>
                  reserve
                </Button>
              </>
            )}
          </>
        )}
      </>
    </Section>
  )
}
