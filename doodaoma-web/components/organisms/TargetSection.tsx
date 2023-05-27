import Link from 'next/link'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { feedSelector, fetchDSOData } from '../../store/features/feed'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Loading } from '../atoms/Loading'
import { Select } from '../atoms/Select'

import { Section } from './Section'

type ITarget = {
  type: string
}

export const TargetSection = () => {
  const dispatch = useAppDispatch()
  const { dsoList, loadDSOListState } = useAppSelector(feedSelector)

  const { register, control } = useForm<ITarget>({
    defaultValues: {
      type: 'Neb',
    },
  })

  const targetType = useWatch({
    control,
    name: 'type',
    defaultValue: 'Neb',
  })

  useEffect(() => {
    dispatch(
      fetchDSOData({
        type: targetType,
      }),
    )
  }, [dispatch, targetType])

  return (
    <Section>
      <>
        <div className="feed-card-header">Target</div>
        <Select {...register('type')}>
          <option value="Neb">Nebula</option>
          <option value="OC">OC</option>
          <option value="GC">Gc</option>
          <option value="Ast">Ast</option>
          <option value="NF">NF</option>
        </Select>
        {loadDSOListState.status === 'loading' ? (
          <Loading />
        ) : (
          <>
            {dsoList && dsoList?.length > 0 ? (
              <div>
                {dsoList.map((ele) => (
                  <Link
                    href={{
                      pathname: '/imaging',
                      query: {
                        ra: ele.ra,
                        dec: ele.dec,
                        name: ele.cat1 + ele.id,
                      },
                    }}
                    key={ele.id}>
                    <div>
                      {ele.cat1}
                      {ele.id}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        )}
      </>
    </Section>
  )
}
