import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/InstaFeed.module.scss";

export default function InstaFeed() {
  const [instagramFeed, setInstagramFeed] = useState({ data: [], paging: {} });
  const [error, setError] = useState(null);

  console.log(instagramFeed);

  const fetchFeed = async () => {
    try {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=IGQWRPcE52MGNicjB4aHgyUVlLZADhfN0FIRU9DbHYxUnRORUo1ejdPRURPSFBSQmJ3WEoxa1JjNnRVQkc2SThBNWRBTHBuakh2ZAW1tNnAxWXVLWVRaWjczRWtkdTVaWnFFbXJIc1l2MldVZAncwbmE5Yk5sZAXNNRHMZD`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch Instagram feed");
      }

      const feed = await response.json();
      console.log(feed);

      setInstagramFeed(feed);
    } catch (err) {
      console.error("Error fetching Instagram feed:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Prikazivanje samo poslednja 4 posta
  const lastFourPosts = instagramFeed.data.slice(-4);

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}

      {lastFourPosts.length > 0 && (
        <div className={styles.instaFeedGrid}>
          {lastFourPosts.map((post) => (
            <div key={post.id} className={styles.instaItem}>
              <Link
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.media_type === "VIDEO" ? (
                  <video src={post.media_url} controls={false} className="" />
                ) : (
                  <Image
                    src={post.media_url}
                    alt={post.caption ?? ""}
                    className=""
                    width={0}
                    height={0}
                    sizes={"100vw"}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
