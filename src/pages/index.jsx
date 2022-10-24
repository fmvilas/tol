import Head from 'next/head'
import Link from 'next/link'
import episodes from '../../episodes.json'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.slug}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="lg:columns-2 lg:gap-8">
          <Link href={`/episodes/${episode.slug}`}>
            <img src={`/images/episodes/${episode.coverImage}`} className="rounded-lg" />
          </Link>
          <div className="">
            <h2
              id={`episode-${episode.slug}-title`}
              className="mt-2 text-lg font-bold text-slate-900"
            >
              <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
            </h2>
            <FormattedDate
              date={date}
              className="font-mono text-sm leading-7 text-slate-500"
            />
            <p className="mt-1 text-base leading-7 text-slate-700">
              {episode.summary}
            </p>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function Home({ episodes }) {
  return (
    <>
      <Head>
        <title>
          Thinking Out Loud - Raw conversations with people from EDA, AsyncAPI, and open-source communities.
        </title>
        <meta
          name="description"
          content="Raw conversations with people from EDA, AsyncAPI, and open-source communities."
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.slug} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      episodes,
    },
    revalidate: 10,
  }
}
