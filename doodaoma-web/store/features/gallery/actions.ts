import {
  deleteImageById,
  fetchAccountImages,
  getImageById,
} from '../../../services/apis'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const fetchMyImages = createAsyncThunk({
  api: fetchAccountImages,
  EVENT_NAME: 'gallery/fetchMyImages',
})

export const fetchImageById = createAsyncThunk({
  api: getImageById,
  EVENT_NAME: 'gallery/getImageById',
})

export const removeImageById = createAsyncThunk({
  api: deleteImageById,
  EVENT_NAME: 'gallery/removeImageById',
})
