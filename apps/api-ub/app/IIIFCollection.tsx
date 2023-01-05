'use client';
import React, { ReactElement } from 'react'
import BloomIIIF from "@samvera/bloom-iiif";

/* NOT WORKING WITH TURBOREPO?
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
 */
type IIIFCollectionProps = {
}

export function IIIFCollection({ }: IIIFCollectionProps): ReactElement {
  const collectionId = `https://raw.githubusercontent.com/samvera-labs/bloom-iiif/main/public/fixtures/iiif/collection/masks-of-antonio-fava.json`;

  return (
    <div className="relative">
      return <BloomIIIF collectionId={collectionId} />;
    </div>
  )
}