import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../../index'

export const selectReservation = (state: RootState) => state.reservation

export const reservationSelector = createSelector(
  selectReservation,
  (state) => state,
)
