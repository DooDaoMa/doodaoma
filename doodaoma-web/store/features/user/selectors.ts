import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '../../index'

export const selectUser = (state: RootState) => state.user

export const userSelector = createSelector(selectUser, (state) => state)
export const currentUserSelector = createSelector(
  selectUser,
  (state) => state.currentUser,
)
