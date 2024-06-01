import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";

import { getApolloClient } from "../lib/apollo-client";

import styles from "../styles/Events.module.scss";

export default function Events({ galleries, general }) {
  const { title, description } = general;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={`${styles.grid} container`}>
          {galleries &&
            galleries.length > 0 &&
            galleries.map((gallery) => (
              <div key={gallery.uri}>
                <Link href={gallery.uri}>
                  <div className={styles.imgHolder}>
                    <Image
                      src={gallery.featuredImage.node.sourceUrl}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt={gallery.featuredImage.node.title}
                    />
                  </div>
                  <h2 className={styles.title}>{gallery.title}</h2>
                </Link>
              </div>
            ))}
          {!galleries ||
            (galleries.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const apolloClient = getApolloClient();

  const language = locale.toUpperCase();

  const data = await apolloClient.query({
    query: gql`
      query galleries($language: LanguageCodeFilterEnum!) {
        galleries(where: { language: $language }, first: 1000) {
          edges {
            node {
              id
              title
              uri
              language {
                code
                locale
              }
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                  title(format: RAW)
                }
              }
            }
          }
        }
        generalSettings {
          title
          description
        }
      }
    `,
    variables: {
      language,
    },
  });

  let galleries = data?.data.galleries.edges

    .map(({ node }) => node)
    .map((gallery) => {
      return {
        ...gallery,
        language,
        path: `/gallery/${gallery.slug}`,
      };
    });

  const general = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      galleries,
      general,
    },
  };
}
