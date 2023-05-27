import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { feedReducer } from './feed'
import { galleryReducer } from './gallery'
import { imagingReducer } from './imaging'
import { reservationReducer } from './reservation'
import { timeSlotReducer } from './timeslot'
import { userReducer } from './user'

const combinedReducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
  reservation: reservationReducer,
  timeSlot: timeSlotReducer,
  feed: feedReducer,
  imaging: imagingReducer,
})

const rootReducer = createReducer(
  combinedReducer(undefined, { type: '' }),
  (builder) => {
    builder.addDefaultCase(combinedReducer)
  },
)

export default rootReducer
