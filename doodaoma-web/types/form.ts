export type ISignUpFormValue = {
  username: string
  email: string
  password: string
  'confirm password': string
}

export type ISignInFormValue = {
  username: string
  password: string
}

export type IReservationFormValue = {
  timeSlotList: Date[]
}

export type IFormValue =
  | ISignUpFormValue
  | ISignInFormValue
  | IReservationFormValue
