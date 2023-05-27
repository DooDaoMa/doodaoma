import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../..'

export const selectGallery = (state: RootState) => state.gallery

export const gallerySelector = createSelector(selectGallery, (state) => state)
