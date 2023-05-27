import { createReducer } from '@reduxjs/toolkit'

import { ErrorTypes } from '../../../types'
import { IImage } from '../../../types/gallery'

import { fetchMyImages, removeImageById } from './actions'

interface InitialStateProps {
  images: IImage[]
  fetchMyImagesState: {
    isLoading: boolean
    error: ErrorTypes | null
  }
}

const initialState: InitialStateProps = {
  images: [],
  fetchMyImagesState: {
    isLoading: false,
    error: null,
  },
}

export const galleryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMyImages.pending, (state) => {
      state.fetchMyImagesState.isLoading = true
      state.fetchMyImagesState.error = null
    })
    .addCase(fetchMyImages.fulfilled, (state, { payload }) => {
      state.fetchMyImagesState.isLoading = false
      state.fetchMyImagesState.error = null
      state.images = payload
    })
    .addCase(fetchMyImages.rejected, (state, { payload }) => {
      state.fetchMyImagesState.isLoading = false
      state.fetchMyImagesState.error = payload as ErrorTypes
    })
    .addCase(removeImageById.fulfilled, (state, { meta }) => {
      const deletedImageId = meta.arg
      state.images = state.images.filter((image) => image.id !== deletedImageId)
    })
})
