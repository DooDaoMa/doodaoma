import { createAction } from '@reduxjs/toolkit'

import { loadTimeSlot } from '../../../services/apis'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const fetchTimeSlot = createAsyncThunk({
  api: loadTimeSlot,
  EVENT_NAME: 'time-slot/load',
})

export const resetTimeSlot = createAction('time-slot/reset')
