import { createAction } from '@reduxjs/toolkit'

import {
  loadAvailableReservation,
  updateTimeSlot,
} from '../../../services/apis'
import { IReservation } from '../../../types'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const reservationSelect =
  createAction<IReservation[]>('reservation/select')

export const resetReservation = createAction('reservation/reset')

export const removeSelectReservation = createAction<string>(
  'reservation/deselect',
)

export const reserveTimeSlot = createAsyncThunk({
  api: updateTimeSlot,
  EVENT_NAME: 'reservation/reserveTimeSlot',
})

export const fetchAvailableReservation = createAsyncThunk({
  api: loadAvailableReservation,
  EVENT_NAME: 'reservation/loadAvailable',
})
