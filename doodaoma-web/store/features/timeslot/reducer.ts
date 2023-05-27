import { createReducer } from '@reduxjs/toolkit'

import { ErrorTypes, ITimeSlot } from '../../../types'

import { fetchTimeSlot, resetTimeSlot } from './actions'

interface InitialStateProps {
  timeSlotList: Array<ITimeSlot> | null
  loadTimeSlotState: {
    status: string
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  timeSlotList: [],
  loadTimeSlotState: {
    status: 'idle',
    error: null,
  },
}

export const timeSlotReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchTimeSlot.pending, (state) => {
    state.loadTimeSlotState.status = 'pending'
  })
  builder.addCase(fetchTimeSlot.fulfilled, (state, { payload }) => {
    state.loadTimeSlotState.status = 'success'
    state.timeSlotList = payload.data
  })
  builder.addCase(fetchTimeSlot.rejected, (state, { payload }) => {
    state.loadTimeSlotState.status = 'error'
    state.loadTimeSlotState.error = payload as ErrorTypes
    state.timeSlotList = []
  })

  builder.addCase(resetTimeSlot, (state) => {
    Object.assign(state, initialState)
  })
})
