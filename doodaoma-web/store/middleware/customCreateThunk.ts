import { createAsyncThunk } from '@reduxjs/toolkit'

const customAsyncThunk = (params: { api: any; EVENT_NAME: string }) =>
  createAsyncThunk(
    params.EVENT_NAME,
    async (payload: unknown, { rejectWithValue }) => {
      try {
        const response = await params.api(payload)
        return response?.data || response
      } catch (error: any) {
        const { response = {} } = error || {}
        const { status = 404, data = {} } = response || {}
        return rejectWithValue({ status, data })
      }
    },
  )

export default customAsyncThunk
