import Image from 'next/image'
import Link from 'next/link'

import { APODData } from '../../types'
import { Loading } from '../atoms/Loading'
import { ReadMore } from '../atoms/ReadMore'

import { Section } from './Section'

type APODSectionProps = {
  content: APODData | null
}

export const APODSection = ({ content }: APODSectionProps) => {
  return (
    <Section className="md:col-span-2 md:row-span-2">
      <>
        {content ? (
          <>
            <div className="feed-card-header">{content.title}</div>
            <Link href={content.hdurl} target="_blank">
              <div className="relative mb-2 min-h-[300px] w-full">
                <Image
                  src={content.url}
                  fill
                  alt="astronomy picture of the day"
                />
              </div>
            </Link>
            <p className="text-center text-sm italic text-gray-600 dark:text-slate-300">
              &#169; {content.copyright}
            </p>
            <ReadMore>{content.explanation}</ReadMore>
          </>
        ) : (
          <Loading />
        )}
      </>
    </Section>
  )
}
