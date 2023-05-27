import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../..'

export const selectFeed = (state: RootState) => state.feed

export const feedSelector = createSelector(selectFeed, (state) => state)
