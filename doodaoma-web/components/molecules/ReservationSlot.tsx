/* eslint-disable react/display-name */
import { format } from 'date-fns'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FiClock } from 'react-icons/fi'

import { IReservationFormValue } from '../../types'

type ReservationSlotProps = {
  startTime: Date
  endTime: Date
}

export const ReservationSlot = React.forwardRef<
  HTMLInputElement,
  ReservationSlotProps & ReturnType<UseFormRegister<IReservationFormValue>>
>(({ startTime, endTime, onChange, onBlur }, ref) => {
  const [checked, isChecked] = useState(false)
  return (
    <div
      className={`border-grey-400 curser-pointer rounded rounded-xl border px-2 py-3 delay-100 duration-150 ease-in-out ${
        checked ? 'border-transparent bg-blue-300' : ''
      }`}
      onClick={(e) => {
        onChange(e)
        isChecked(!checked)
      }}
      onBlur={onBlur}
      role="button"
      tabIndex={1}>
      <p className="font-bold">
        {format(startTime, 'kk:mm')} - {format(endTime, 'kk:mm')}
      </p>
      <p>
        <FiClock />1 hour
      </p>
      <input
        type="checkbox"
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={startTime.toISOString()}
        className="hidden"
      />
    </div>
  )
})
