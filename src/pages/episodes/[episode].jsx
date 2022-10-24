import Head from 'next/head'
import episodes from '../../../episodes.json'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import YouTube from 'react-youtube'

export default function Episode({ episode }) {
  let date = new Date(episode.published)

  return (
    <>
      <Head>
        <title>{`${episode.title} - Thinking Out Loud`}</title>
        <meta name="description" content={episode.description} />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
          </header>
          { episode.videoSource === 'youtube' && (
            <YouTube
              videoId={episode.videoId}
              className="mt-8 w-full"
            />
          ) }
          <hr className="my-12 border-gray-200" />
          <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
            {episode.description}
          </p>
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      episode: episodes.find(e => e.slug === params.episode),
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  return {
    paths: episodes.map(({ slug }) => ({
      params: {
        episode: slug,
      },
    })),
    fallback: 'blocking',
  }
}
