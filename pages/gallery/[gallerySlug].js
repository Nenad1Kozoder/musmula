import Head from "next/head";
import Image from "next/image";
import galleryStringHandler from "../../lib/galleryStringhandler";
import { gql } from "@apollo/client";
import Transition from "../../components/Transition";

import { getApolloClient } from "../../lib/apollo-client";

import styles from "../../styles/Gallery.module.scss";

export default function Gallery({ gallery, site, language }) {
  const galeryItems = galleryStringHandler(gallery.translation.content);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {gallery.translation.seo.title
            ? gallery.translation.seo.title
            : gallery.title}
        </title>
        <meta
          name="description"
          content={
            gallery.translation.seo.description
              ? gallery.translation.seo.description
              : `Read more about ${gallery.title} on ${site.title}`
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          className={styles.headerImage}
          src={gallery.translation.galleryFields.headerImage.node.sourceUrl}
          width={0}
          height={0}
          sizes="100vw"
          alt={gallery.translation.galleryFields.headerImage.node.title}
        />
        <Transition>
          <div className={styles.eventData}>
            <h1>{gallery.translation.title}</h1>
            <p>
              {language === "EN" ? "Author: " : "Fotograf: "}
              {gallery.translation.galleryFields.author}
            </p>
            <p>
              {language === "EN" ? "Location: " : "Lokacija: "}
              {gallery.translation.galleryFields.location}
            </p>
            <p>
              {language === "EN" ? "Client: " : "Klijent: "}
              {gallery.translation.galleryFields.client}
            </p>
          </div>
        </Transition>

        <div className={styles.imageGallery}>
          {galeryItems.map((item, i) => {
            const portretImage = item.orientation === "portrait";
            const imgWidth = portretImage ? 400 : 600;
            const imgHeight = portretImage ? 600 : 400;

            return (
              <div
                key={i}
                className={
                  portretImage ? styles.imagePortret : styles.imageLendscape
                }
              >
                <Transition>
                  <Image
                    src={item.src}
                    srcSet={item.srcset}
                    width={imgWidth}
                    height={imgHeight}
                    alt={"testx"}
                  />
                </Transition>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  // const { gallerySlug } = params;
  const language = locale.toUpperCase();

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query GalleryBySlug($slug: String!, $language: LanguageCodeEnum!) {
        generalSettings {
          title
        }
        galleryBy(slug: $slug) {
          id
          content
          title
          slug
          translation(language: $language) {
            id
            slug
            content
            title
            language {
              locale
              slug
            }
            galleryFields {
              author
              location
              client
              headerImage {
                node {
                  sourceUrl
                  title
                }
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                title(format: RAW)
              }
            }
            seo {
              description
              title
            }
          }
        }
      }
    `,
    variables: {
      slug: params.gallerySlug,
      language,
    },
  });

  let gallery = data?.data.galleryBy;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      gallery,
      language,
      path: `/gallery/${gallery.slug}`,
      site,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ locales }) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        galleries(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const galleries = data?.data.galleries.edges.map(({ node }) => node);

  const paths = galleries.map(({ slug }) => {
    return {
      params: {
        gallerySlug: slug,
      },
    };
  });

  return {
    paths: [
      ...paths,
      ...paths.flatMap((path) => {
        return locales.map((locale) => {
          return {
            ...path,
            locale,
          };
        });
      }),
    ],
    paths: [],
    fallback: "blocking",
  };
}
