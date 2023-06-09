import {
  addDays,
  format,
  startOfToday,
  parseJSON,
  isSameHour,
  isEqual,
  isPast,
} from 'date-fns'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'

import { Button, Loading, Modal, Section } from '../../components'
import { reserveTimeSlot } from '../../store/features/reservation'
import { fetchTimeSlot, timeSlotSelector } from '../../store/features/timeslot'
import { userSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { groupReserveDate } from '../../utils/dateTime'

export default function ReservationPage() {
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(userSelector)
  const { timeSlotList, loadTimeSlotState } = useAppSelector(timeSlotSelector)

  const [schedule, setSchedule] = useState<Date[]>([])
  const [reservedList, setReservedList] = useState<Date[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const handleChange = (newSchedule: Date[]) => {
    setSchedule(newSchedule)
  }

  // const getFormatSelectedTime = () => {
  //   const timeFormat = 'dd eee kk:mm'
  //   return `${format(schedule.at(0) || new Date(), timeFormat)} - ${format(
  //     schedule.at(schedule.length - 1) || new Date(),
  //     timeFormat,
  //   )}`
  // }

  const onConfirm = () => {
    const timeSlotIdList = schedule?.map((selectedSlot) => {
      const slot = timeSlotList?.find((timeSlot) => {
        return isEqual(selectedSlot, parseJSON(timeSlot.startTime))
      })
      if (slot) {
        return slot._id
      }
    })
    dispatch(
      reserveTimeSlot({
        updatedList: timeSlotIdList,
        status: 'reserved',
        username: currentUser?.username,
      }),
    )

    setIsOpenModal(false)
  }

  // fetch time slot list
  useEffect(() => {
    dispatch(
      fetchTimeSlot({
        startTime: startOfToday(),
        endTime: addDays(startOfToday(), 7),
      }),
    )
  }, [])

  // set reserved time slot list
  useEffect(() => {
    if (timeSlotList && timeSlotList?.length > 0) {
      setReservedList([
        ...timeSlotList
          .filter((timeSlot) => timeSlot.status !== 'available')
          .map((timeSlot) => parseJSON(timeSlot.startTime)),
      ])
    }
    // timeSlotList?.forEach((ele) => {
    //   console.log(format(parseJSON(ele.startTime), 'dd eee kk:mm'), ele.startTime)
    // })
  }, [timeSlotList])

  return (
    <>
      <Head>
        <title>Reservation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        isOpen={isOpenModal}
        handleIsOpen={setIsOpenModal}
        title="Confirm your reservation"
        isPrimaryBtnDisabled={schedule.length < 1}
        handleSubmit={() => onConfirm()}>
        <h3 className="mb-2 text-xl font-semibold">Selected Time Slots:</h3>
        <div className="max-h-96 overflow-y-auto">
          <>
            {Object.entries(groupReserveDate(schedule)).map(([key, value]) => (
              <div key={key} className="mb-2">
                <p className="font-semibold">{key}</p>
                <div>
                  {format(value[0], 'hh:mm aaaa')} to{' '}
                  {format(value[value.length - 1], 'hh:mm aaaa')}
                </div>
                <div>{value.length} hours</div>
              </div>
            ))}
          </>
        </div>
        <p>total: {schedule.length} hour(s)</p>
      </Modal>
      <Section>
        <h1 className="section-title">Book the Telescope</h1>
        <p className="mb-8 text-lg">
          Select available date and time for reservation
        </p>
        {loadTimeSlotState.status === 'success' ? (
          <>
            <ScheduleSelector
              selection={schedule}
              minTime={18}
              maxTime={30}
              selectionScheme="linear"
              onChange={handleChange}
              columnGap="1.25rem"
              rowGap="1.25rem"
              startDate={startOfToday()}
              renderDateCell={(dateTime, selected) => {
                const reserved = reservedList?.find((timeSlot) =>
                  isSameHour(timeSlot, dateTime),
                )
                const isTs = timeSlotList?.find((timeSlot) =>
                  isSameHour(parseJSON(timeSlot.startTime), dateTime),
                )
                return (
                  <>
                    <button
                      className={`border-grey-400 curser-pointer w-full rounded-sm border px-2 py-3 delay-100 duration-150 ease-in-out disabled:bg-slate-200 ${
                        selected ? 'border-transparent bg-blue-300' : ''
                      } ${reserved ? 'disabled:bg-red-300' : ''} ${
                        !isTs ? 'disabled:bg-slate-600' : ''
                      }
                      }`}
                      disabled={
                        !!reserved || isPast(dateTime) || !isTs
                      }></button>
                  </>
                )
              }}
              renderTimeLabel={(dateTime) => (
                <div className="my-auto text-slate-900 dark:text-slate-200">
                  {format(dateTime, 'h aaaa')}
                </div>
              )}
              renderDateLabel={(dateTime) => (
                <div className="text-center font-bold text-slate-900 dark:text-slate-200">
                  {format(dateTime, 'd E')}
                </div>
              )}
            />
            <Button
              className="ml-auto mt-6"
              disabled={schedule.length < 1}
              onClick={() => setIsOpenModal(true)}>
              next
            </Button>
          </>
        ) : (
          <Loading />
        )}
      </Section>
    </>
  )
}

ReservationPage.requireAuth = true
