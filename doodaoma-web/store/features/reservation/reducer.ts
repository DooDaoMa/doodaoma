import { createReducer } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { ErrorTypes, IReservation } from '../../../types'

import { resetReservation, reservationSelect, reserveTimeSlot } from './actions'

interface InitialStateProps {
  reservationList: Array<IReservation> | null
  saveReservationState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  reservationList: [],
  saveReservationState: {
    status: 'idle',
    error: null,
  },
}

export const reservationReducer = createReducer(initialState, (builder) => {
  builder.addCase(reservationSelect, (state, { payload }) => {
    if (state.reservationList) {
      state.reservationList = [...state.reservationList, ...payload]
    }
  })
  builder.addCase(reserveTimeSlot.pending, (state) => {
    state.saveReservationState.status = 'pending'
    state.saveReservationState.error = null
    toast.info('Reserving')
  })
  builder.addCase(reserveTimeSlot.fulfilled, (state) => {
    state.saveReservationState.status = 'success'
    state.saveReservationState.error = null
    toast.success('Reserved Success')
  })
  builder.addCase(reserveTimeSlot.rejected, (state, { payload }) => {
    state.saveReservationState.status = 'error'
    state.saveReservationState.error = payload as ErrorTypes
    toast.error('Reserved Fail')
  })
  builder.addCase(resetReservation, (state) => {
    state.reservationList = []
  })
})
