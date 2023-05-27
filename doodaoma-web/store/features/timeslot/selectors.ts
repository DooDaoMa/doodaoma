import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../..'

export const selectTimeSlot = (state: RootState) => state.timeSlot

export const timeSlotSelector = createSelector(selectTimeSlot, (state) => state)
