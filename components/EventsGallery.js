// components/ImageExtractor.js
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Transition from "./Transition";

import styles from "../styles/ImageGallery.module.scss";

export default function ImageGallery({ htmlString }) {
  const [images, setImages] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && divRef.current) {
      const imgElements = Array.from(
        divRef.current.querySelectorAll("img")
      ).map((img) => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        isPortrait: img.height > img.width,
      }));
      setImages(imgElements);
    }
  }, [htmlString]);

  return (
    <div>
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: htmlString }}
        style={{ display: "none" }}
      />
      <div className={styles.imageGallery}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`gallery-item ${
              img.isPortrait ? styles.imagePortret : styles.imageLendscape
            }`}
          >
            <Transition>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                layout="responsive"
                loading="lazy"
              />
            </Transition>
          </div>
        ))}
      </div>
    </div>
  );
}

ImageGallery;
