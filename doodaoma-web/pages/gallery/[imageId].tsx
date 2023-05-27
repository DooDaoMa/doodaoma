import { format, parseJSON } from 'date-fns'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Loading } from '../../components'
import { fetchImageById, removeImageById } from '../../store/features/gallery'
import { useAppDispatch } from '../../store/hooks'
import { IImage } from '../../types/gallery'
import { blackPlaceholderUrl } from '../../types/imaging'

export default function ImageDetail() {
  const { query, push } = useRouter()
  const dispatch = useAppDispatch()
  const [imageDetail, setImageDetail] = useState<IImage>()

  useEffect(() => {
    ;(async () => {
      if (!query.imageId) return
      const response = await dispatch(fetchImageById(query.imageId))
      if (response.meta.requestStatus === 'fulfilled') {
        setImageDetail(response.payload as IImage)
      }
    })()
  }, [query, dispatch])

  const onRemove = async () => {
    if (imageDetail === undefined) return
    const response = await dispatch(removeImageById(imageDetail.id))
    if (response.meta.requestStatus === 'fulfilled') {
      push('/gallery')
      toast.success('Image removed')
    }
  }

  return (
    <>
      <Head>
        <title>View Image</title>
      </Head>
      {imageDetail !== undefined ? (
        <div>
          <h1 className="mb-2 text-3xl font-bold">
            {imageDetail.displayName || imageDetail.name}
          </h1>
          <p className="mb-2 italic">
            Created at{' '}
            {format(parseJSON(imageDetail.createdAt), 'dd E HH:mm aa')}
          </p>
          <div className="mb-6 flex gap-2">
            <a href={imageDetail.imageUrl} download>
              <Button btnStyle="secondary">Download</Button>
            </a>
            <Button btnStyle="danger" onClick={onRemove}>
              Remove
            </Button>
          </div>
          <Image
            src={imageDetail.imageUrl}
            alt={`${imageDetail.name} gallery image`}
            width={800}
            height={600}
            placeholder="blur"
            blurDataURL={blackPlaceholderUrl}
            className="rounded-2xl"
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

ImageDetail.requireAuth = true
