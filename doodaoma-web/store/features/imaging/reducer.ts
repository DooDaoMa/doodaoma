import { createReducer } from '@reduxjs/toolkit'

import { ImagingStatus } from '../../../types/imaging'

import { setImagingStatus } from './actions'

interface InitialStateProps {
  imagingStatus: ImagingStatus
  previousImagingStatus: ImagingStatus
}

const initialState: InitialStateProps = {
  imagingStatus: 'empty',
  previousImagingStatus: 'empty',
}

export const imagingReducer = createReducer(initialState, (builder) => {
  builder.addCase(setImagingStatus, (state, { payload }) => {
    state.previousImagingStatus = state.imagingStatus
    state.imagingStatus = payload
  })
})
