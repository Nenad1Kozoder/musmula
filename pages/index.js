import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { gql } from "@apollo/client";
import pecat from "../assets/pecat.svg";

import { getApolloClient } from "../lib/apollo-client";

import styles from "../styles/Home.module.scss";
import Form from "../components/Form";
import InstaFeed from "../components/instaFeed";
import { Fragment } from "react";
import Transition from "../components/Transition";

export default function Home({ page, galleries, general, locale }) {
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
    instagram,
    seo,
  } = page;

  const instaLink = instagram.title.slice(instagram.title.indexOf("@") + 1);
  const instaTitle = instagram.title.slice(0, instagram.title.indexOf("@"));

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null; // Nema renderovanja dok stranica ne bude renderovana na klijentu
  // }

  function splitStringWithBR(input) {
    let middle = Math.floor(input.length / 2);
    let leftIndex = input.lastIndexOf(" ", middle);
    let rightIndex = input.indexOf(" ", middle);
    let splitIndex;

    if (leftIndex === -1 && rightIndex === -1) {
      splitIndex = middle;
    } else if (leftIndex === -1) {
      splitIndex = rightIndex;
    } else if (rightIndex === -1) {
      splitIndex = leftIndex;
    } else {
      splitIndex =
        middle - leftIndex <= rightIndex - middle ? leftIndex : rightIndex;
    }

    let part1 = input.substring(0, splitIndex);
    let part2 = input.substring(splitIndex + 1);

    return part1 + " <br/>" + part2;
  }

  const headerTitle = splitStringWithBR(homepageMessage.headerMessage);

  return (
    <Fragment>
      <Head>
        <title>{seo.title ? seo.title : title}</title>
        <meta
          name="description"
          content={seo.description ? seo.description : description}
        />
        <link rel="icon" href="pecat.svg" />
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
          <h2
            className={styles.headerTitle}
            dangerouslySetInnerHTML={{ __html: headerTitle }}
          />
        </section>
        <Transition>
          <section className={`${styles.topSection} container`} id="activities">
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
        </Transition>
        <Transition>
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
        </Transition>
        <Transition>
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
        </Transition>
        <Transition>
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
        </Transition>
        <Transition>
          <section className={`${styles.gallery} container`} id="weddings">
            <h2 className={styles.galleryTitle}>{gallerySection.title}</h2>
            <div className={styles.galleryHolder}>
              {galleries &&
                galleries.length > 0 &&
                galleries.map((gallery) => (
                  <div key={gallery.uri}>
                    <Link href={gallery.uri} className={styles.galleryPageLink}>
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
              <button>{gallerySection.linkText}</button>
            </Link>
          </section>
        </Transition>
        <Transition>
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
        </Transition>
        <Transition>
          <section className={`${styles.published} container`}>
            <h3>{published.title}</h3>
            <div className={styles.logosHolder}>
              <div className={styles.logoHolder}>
                <Image
                  fill
                  src={published.news.imageOne.node.sourceUrl}
                  sizes={published.news.imageOne.node.sizes}
                  alt={published.news.imageOne.node.title}
                />
              </div>
              <div className={styles.logoHolder}>
                <Image
                  fill
                  src={published.news.imageTwo.node.sourceUrl}
                  sizes={published.news.imageTwo.node.sizes}
                  alt={published.news.imageTwo.node.title}
                />
              </div>
              <div className={styles.logoHolder}>
                <Image
                  fill
                  src={published.news.imageThree.node.sourceUrl}
                  sizes={published.news.imageThree.node.sourceUrl}
                  alt={published.news.imageThree.node.title}
                />
              </div>
            </div>
          </section>
        </Transition>
        <Transition>
          <section className={`${styles.about} container`} id="about">
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
        </Transition>
        <Transition>
          <section className={styles.instaSection}>
            <h2 className={styles.instaTitle}>
              {instaTitle}
              <a
                href={`https://www.instagram.com/${instaLink}/`}
                target="blank"
                passhref="true"
              >
                @{instaLink}
              </a>
            </h2>
            {/* <InstaFeed /> */}
            <Script
              src="https://static.elfsight.com/platform/platform.js"
              async
            ></Script>
            <div
              suppressHydrationWarning
              className="elfsight-app-9872b12a-8095-4bf8-b766-7098a83e3c83"
              data-elfsight-app-lazy
            ></div>
          </section>
        </Transition>
        <Transition>
          <section className={`${styles.formSection} container`} id="contact">
            <h2>{contact.title}</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: contact.description }}
            />
            <ul className={styles.contactList}>
              <li>
                <span>{contact.contacts.name_one}</span>
                <a href={`tel:${contact.contacts.phone_one}`}>
                  {contact.contacts.phone_one}
                </a>
              </li>
              <li>
                <span>{contact.contacts.name_two}</span>
                <a href={`tel:${contact.contacts.phone_two}`}>
                  {contact.contacts.phone_two}
                </a>
              </li>
              <li>
                <span>e-mail:</span>
                <a href={`mailto:${contact.contacts.email}`}>
                  {contact.contacts.email}
                </a>
              </li>
            </ul>
            <Form
              locale={locale}
              publicKey={contact.platformKeys.publicKey}
              serviceKey={contact.platformKeys.serviceKey}
              templateKey={contact.platformKeys.templateKey}
            />
          </section>
        </Transition>
      </main>
    </Fragment>
  );
}

export async function getServerSideProps({ locale }) {
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
              ... on Page {
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
                  contacts {
                    email
                    name_one
                    name_two
                    phone_one
                    phone_two
                  }
                  platformKeys {
                    publicKey
                    serviceKey
                    templateKey
                  }
                }
                instagram {
                  title
                }
                seo {
                  description
                  title
                }
                isFrontPage
              }
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
      locale,
    },
  };
}
