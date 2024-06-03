import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import pecat from "../assets/pecat.svg";

import { getApolloClient } from "../lib/apollo-client";

import styles from "../styles/Home.module.scss";
import Form from "../components/Form";
import InstaFeed from "../components/instaFeed";

export default function Home({ page, galleries, general }) {
  const { title, description } = general;
  const {
    homepageMessage,
    homepageTopPageMessage,
    imageAndTextFirst,
    imageAndTextSecond,
    featuredImage,
    greenSection,
    gallerySection,
    whatWeAreDoing,
    published,
    twoLargeImage,
    about,
    contact,
  } = page;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.headerHolder}>
          <Image
            className={styles.headerImage}
            src={featuredImage.node.sourceUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt={featuredImage.node.title}
          />
          <h2 className={styles.headerTitle}>
            {homepageMessage.headerMessage}
          </h2>
        </section>
        <section
          className={`${styles.topSection} container`}
          id="what-are-we-doing"
        >
          <div className={styles.titleHolder}>
            <h1 className={styles.topTitle}>
              {homepageTopPageMessage.topPageMessage}
            </h1>
            <h4 className={styles.topSubtitle}>
              {homepageTopPageMessage.messageSubtitle}
            </h4>
          </div>
          <div className={styles.topDescription}>
            <Image
              src={imageAndTextFirst.image.node.sourceUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt={imageAndTextFirst.image.node.title}
            />
            <div className={styles.topTitleHolder}>
              <h2>{imageAndTextFirst.title}</h2>
              <p>{imageAndTextFirst.description}</p>
            </div>
          </div>
        </section>
        <section className={styles.greenSection}>
          <div className={`${styles.greenSectionFlex} container`}>
            <p>{`"${greenSection.message}"`}</p>
            <Image
              src={greenSection.imageLogo.node.sourceUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt={greenSection.imageLogo.node.title}
            />
          </div>
        </section>
        <section className={`${styles.secondDescription} container`}>
          <div className={styles.secondDesHolder}>
            <h2>{imageAndTextSecond.title}</h2>
            <p>{imageAndTextSecond.description}</p>
            <Image
              src={pecat}
              width={0}
              height={0}
              sizes="100vw"
              alt={"musmula"}
            />
          </div>
          <Image
            src={imageAndTextSecond.image.node.sourceUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt={imageAndTextSecond.image.node.title}
          />
        </section>
        <section className={styles.whatWeDo}>
          <div className="container">
            <h2>{whatWeAreDoing.title}</h2>
            <p>{whatWeAreDoing.description}</p>
            <div className={styles.threeImages}>
              <Image
                src={whatWeAreDoing.threeImages.imageOne.node.sourceUrl}
                width={0}
                height={0}
                sizes="100vw"
                alt={whatWeAreDoing.threeImages.imageOne.node.title}
              />
              <Image
                src={whatWeAreDoing.threeImages.imageTwo.node.sourceUrl}
                width={0}
                height={0}
                sizes="100vw"
                alt={whatWeAreDoing.threeImages.imageTwo.node.title}
              />
              <Image
                src={whatWeAreDoing.threeImages.imageThree.node.sourceUrl}
                width={0}
                height={0}
                sizes="100vw"
                alt={whatWeAreDoing.threeImages.imageThree.node.title}
              />
            </div>
          </div>
          <div className={styles.twoImages}>
            <Image
              src={whatWeAreDoing.twoImages.imageOne.node.sourceUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt={whatWeAreDoing.twoImages.imageOne.node.title}
            />
            <Image
              src={whatWeAreDoing.twoImages.imageTwo.node.sourceUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt={whatWeAreDoing.twoImages.imageTwo.node.title}
            />
          </div>
        </section>
        <section className={`${styles.gallery} container`} id="our-weddings">
          <h2 className={styles.galleryTitle}>{gallerySection.title}</h2>
          <div className={styles.galleryHolder}>
            {galleries &&
              galleries.length > 0 &&
              galleries.map((gallery) => (
                <div key={gallery.uri} className="card">
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
                    <h3>{gallery.title}</h3>
                  </Link>
                </div>
              ))}
            {!galleries ||
              (galleries.length === 0 && (
                <li>
                  <p>Oops, no posts found!</p>
                </li>
              ))}
          </div>
          <Link href="/events" className={styles.galleryLink}>
            {gallerySection.linkText}
          </Link>
        </section>
        <section className={styles.largeImages}>
          <Image
            src={twoLargeImage.imageOne.node.sourceUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt={twoLargeImage.imageOne.node.title}
          />
          <Image
            src={twoLargeImage.imageTwo.node.sourceUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt={twoLargeImage.imageTwo.node.title}
          />
        </section>
        <section className={`${styles.published} container`}>
          <h3>{published.title}</h3>
          <div className={styles.logoHolder}>
            <Image
              src={published.news.imageOne.node.sourceUrl}
              width={0}
              height={0}
              sizes={published.news.imageOne.node.sizes}
              alt={published.news.imageOne.node.title}
            />
            <Image
              src={published.news.imageTwo.node.sourceUrl}
              width={0}
              height={0}
              sizes={published.news.imageTwo.node.sizes}
              alt={published.news.imageTwo.node.title}
            />
            <Image
              src={published.news.imageThree.node.sourceUrl}
              width={0}
              height={0}
              sizes={published.news.imageThree.node.sourceUrl}
              alt={published.news.imageThree.node.title}
            />
          </div>
        </section>
        <section className={`${styles.about} container`}>
          <div className={styles.aboutHolder}>
            <h2>{about.title}</h2>
            <div
              className={styles.textHolder}
              dangerouslySetInnerHTML={{ __html: about.description }}
            />

            <p className={styles.subscription}>{about.subscription}</p>
          </div>
          <Image
            src={about.image.node.sourceUrl}
            width={0}
            height={0}
            sizes={"100vw"}
            alt={about.image.node.title}
          />
        </section>
        {/* <section>
          <InstaFeed />
        </section> */}
        <section className={`${styles.formSection} container`}>
          <h2>{contact.title}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: contact.description }}
          />
          <Form />
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
      query data($language: LanguageCodeFilterEnum!) {
        galleries(where: { language: $language }, first: 3) {
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
                  title(format: RENDERED)
                }
              }
            }
          }
        }
        generalSettings {
          title
          description
        }
        pages(where: { language: $language }) {
          edges {
            node {
              homepageMessage {
                headerMessage
              }
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                  title(format: RENDERED)
                }
              }
              homepageTopPageMessage {
                topPageMessage
                messageSubtitle
              }
              imageAndTextFirst {
                title
                description
                image {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
              }
              imageAndTextSecond {
                title
                description
                image {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
              }
              greenSection {
                message
                imageLogo {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
              }
              gallerySection {
                linkText
                title
              }
              whatWeAreDoing {
                description
                title
                threeImages {
                  imageOne {
                    node {
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                  imageTwo {
                    node {
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                  imageThree {
                    node {
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                }
                twoImages {
                  imageOne {
                    node {
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                  imageTwo {
                    node {
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                }
              }
              published {
                title
                news {
                  imageOne {
                    node {
                      sizes
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                  imageTwo {
                    node {
                      sizes
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                  imageThree {
                    node {
                      sizes
                      sourceUrl
                      title(format: RENDERED)
                    }
                  }
                }
              }
              twoLargeImage {
                imageOne {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
                imageTwo {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
              }
              about {
                title
                description
                subscription
                image {
                  node {
                    sourceUrl
                    title(format: RENDERED)
                  }
                }
              }
              contact {
                title
                description
              }
              isFrontPage
            }
          }
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

  const page = {
    ...data?.data.pages.edges.filter(({ node }) => node.isFrontPage === true)[0]
      ?.node,
    ...data?.data.nodeByUri,
  };
  const general = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      galleries,
      general,
    },
  };
}
