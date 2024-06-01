export default function galleryStringHandler(stringContent) {
  let galleryItems = [];
  let galleryStage = "";
  const startSubStr = "<div class";
  const endSubStr = "</figure>";

  const startSubStrPosition = stringContent.indexOf(startSubStr);
  const endSubStrPosition =
    stringContent.lastIndexOf(endSubStr) - endSubStr.length;

  if (startSubStrPosition !== -1 && endSubStrPosition !== -1) {
    const preString = stringContent.substring(0, startSubStrPosition);
    galleryStage = stringContent
      .replace(preString, "")
      .substring(0, endSubStrPosition + endSubStr.length - startSubStrPosition)
      .split("</figure><figure class='gallery-item'>");
    galleryStage.map((image) => {
      const item = {
        orientation: image.substring(
          image.indexOf("gallery-icon ") + 13,
          image.indexOf("'>")
        ),
        src: image.substring(
          image.indexOf('src="') + 5,
          image.indexOf('" class')
        ),
        srcset: image.substring(
          image.indexOf('srcset="'),
          image.indexOf('" sizes=')
        ),
      };
      galleryItems.push(item);
    });
  }

  return galleryItems;
}
