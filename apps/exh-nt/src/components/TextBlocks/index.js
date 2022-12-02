import { Link } from '../../components/Link'
import { PortableText } from '@portabletext/react'
import {
  BigTextBlock,
  IframeBlock,
  PageHeaderBlock,
  QuoteBlock,
  TextBlock,
  ObjectBlock,
  TableBlock,
  TwoColumnBlock,
  VideoBlock,
  IllustrationWithCaption,
} from './Blocks'

const myPortableTextComponents = () => {
  return {
    types: {
      //image: ({value}) => <img src={value.imageUrl} />,
      BigTextBlock: ({ value }) => <BigTextBlock {...value} />,
      IframeBlock: ({ value }) => <IframeBlock {...value} />,
      IllustrationWithCaption: ({ value }) => <IllustrationWithCaption {...value} />,
      ObjectBlock: ({ value }) => <ObjectBlock {...value} />,
      PageHeader: ({ value }) => <PageHeaderBlock {...value} />,
      Quote: ({ value }) => <QuoteBlock {...value} />,
      SectionText: ({ value }) => <TextBlock {...value} />,
      SingleObject: ({ value }) => <ObjectBlock {...value} />,
      Table: ({ value }) => <TableBlock {...value} />,
      TwoColumn: ({ value }) => <TwoColumnBlock {...value} />,
      Video: ({ value }) => <VideoBlock {...value} />,
    },

    block: {
      normal: ({ children }) => (
        <p className='mb-3 font-light max-w-prose'>
          {children}
        </p>
      ),
      h1: ({ children }) => <h1>{children}</h1>,
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      h5: ({ children }) => <h5>{children}</h5>,
      h6: ({ children }) => <h6>{children}</h6>,
    },

    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <Link href={value.href} rel={rel}>
            {children}
          </Link>
        )
      },
    },

    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol>
          {children}
        </ol>
      ),
    },
  }
}

export const TextBlocks = ({ value }) => {
  return <PortableText value={value} components={myPortableTextComponents()} />
}
