import { createAction } from '@reduxjs/toolkit'

import { ImagingStatus } from '../../../types/imaging'

export const resetForm = createAction('imaging/resetForm')

export const setImagingStatus = createAction<ImagingStatus>(
  'imaging/setImagingStatus',
)
