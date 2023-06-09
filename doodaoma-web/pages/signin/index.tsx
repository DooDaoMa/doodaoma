import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Input, Section } from '../../components'
import {
  currentUserSelector,
  login,
  userSelector,
} from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ISignInFormValue } from '../../types'

export default function SignIn() {
  const dispatch = useAppDispatch()
  const { loginState } = useAppSelector(userSelector)
  const currentUser = useAppSelector(currentUserSelector)
  const { register, handleSubmit } = useForm<ISignInFormValue>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const onSignIn: SubmitHandler<ISignInFormValue> = (data) => {
    dispatch(login({ username: data.username, password: data.password }))
  }

  const onPerformSignIn = () => {
    if (loginState.status === 'success') {
      toast.success('Sign In success')
    } else if (loginState.status === 'error') {
      toast.error('Authentication fail')
    }
  }

  const onSignedIn = () => {
    if (currentUser !== null) {
      Router.push('/')
    }
  }

  useEffect(onPerformSignIn, [loginState])
  useEffect(onSignedIn, [currentUser])

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section className="container mx-auto flex flex-col gap-y-8 md:flex-row md:gap-x-8">
        <>
          <div className="flex grow-[2] md:block">
            <Image src="/people.svg" height={400} width={600} alt="people" />
          </div>
          <div className="flex grow-[1] flex-col gap-y-8">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <form
              onSubmit={handleSubmit(onSignIn)}
              className="flex flex-col gap-y-3">
              <Input label="Username" {...register('username')} />
              <Input
                label="Password"
                type="password"
                {...register('password')}
              />
              <Button type="submit">submit</Button>
            </form>
            <p className="text-sm text-gray-500">
              Don&rsquo;t have an account?&nbsp;
              <Link href={'/signup'} className="font-bold text-black underline">
                Sign-up
              </Link>
            </p>
          </div>
        </>
      </Section>
    </>
  )
}
