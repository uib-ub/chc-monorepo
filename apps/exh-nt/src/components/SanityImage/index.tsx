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
  type?: string
} & ImagePropsWithoutSrc;

export default function SanityImage({
  image,
  type = 'responsive',
  alt = '',
  placeholder = "blur",
  style,
  className
}: SanityImageProps) {
  const imageProps = useNextSanityImage(sanityClient, image);

  if (type === 'fill') {
    return (
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        className={className}
        alt={alt}
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />

    )
  }

  /* eslint-disable */
  return (
    <Image
      {...imageProps}
      className={className}
      style={{ width: '100%', height: 'auto' }}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={image?.asset.metadata.lqip}
    />
  );
}