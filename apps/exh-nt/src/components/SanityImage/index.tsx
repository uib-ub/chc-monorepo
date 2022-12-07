import Image, { ImageProps } from "next/image";
import { sanityClient } from "../../lib/sanity.server";
import { useNextSanityImage } from "next-sanity-image";

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: "reference";
    metadata: any
  };
  caption: string;
}

type ImagePropsWithoutSrc = Omit<ImageProps, "src">;

type SanityImageProps = {
  image: SanityImage;
} & ImagePropsWithoutSrc;

export default function SanityImage({
  image,
  alt = '',
  placeholder = "blur",
  style,
  className
}: SanityImageProps) {
  const imageProps = useNextSanityImage(sanityClient, image);

  /* eslint-disable */
  return (
    <Image
      {...imageProps}
      style={style}
      className={className}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={image.asset.metadata.lqip}
    />
  );
}