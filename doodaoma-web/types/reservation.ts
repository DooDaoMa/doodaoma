export type IReservation = {
  username: string
  deviceId: string
  startTime: string
  endTime: string
  status: 'available' | 'reserved'
}

export type AvailableReservationQueryParams = {
  startTime: Date
  endTime: Date
  username?: string
  status?: string
}

export type ITimeSlot = {
  _id: string
  startTime: Date
  endTime: Date
  username: string
  status: string
}

export type UpdateTimeSlotProps = {
  updatedList: string[]
  status: string
  username: string
}
