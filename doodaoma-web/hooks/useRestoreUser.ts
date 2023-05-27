import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  resetCurrentUser,
  restoreUser,
  userSelector,
} from '../store/features/user'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useRestoreUser = () => {
  const dispatch = useAppDispatch()
  const { restoreUserState } = useAppSelector(userSelector)
  const { pathname } = useRouter()

  useEffect(() => {
    dispatch(restoreUser())
  }, [dispatch])

  useEffect(() => {
    if (restoreUserState.status === 'error') {
      toast.error('Restore user failed. Please sign in again')
      dispatch(resetCurrentUser())
      Router.push('/signin')
    }
  }, [restoreUserState, pathname, dispatch])

  return restoreUserState.status === 'loading'
}
