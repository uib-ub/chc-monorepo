import Image, { ImageProps } from "next/image";
import { sanityClient } from "../../lib/sanity.server";
import { useNextSanityImage } from "next-sanity-image";

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption: string;
}

type ImagePropsWithoutSrc = Omit<ImageProps, "src">;

type SanityImageProps = {
  image: SanityImage;
} & ImagePropsWithoutSrc;

export default function SanityImage({
  image,
  alt,
  placeholder = "blur",
  ...props
}: SanityImageProps) {
  const imageProps = useNextSanityImage(sanityClient, image);

  /* eslint-disable */
  return (
    <Image
      {...imageProps}
      {...props}
      alt={alt ?? image?.caption}
      placeholder={placeholder}
    />
  );
}