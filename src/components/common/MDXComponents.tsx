import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import CustomLink from './Link'
import Pre from "./Pre";
import TOCInline from './TOCInline'
import Image from './Image'

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = require(`./layouts/${layout}`).default
  return <Layout {...rest} />
}



export const MDXComponents: any = {
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  Image,
  TOCInline,
  // BlogNewsletterForm,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
