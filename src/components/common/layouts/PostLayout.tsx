import React, { ReactNode } from "react";
import siteMetadata from "../../../data/siteMetadata";
import { AuthorFrontMatter } from "../../../types/AuthorFrontMatter";
import { PostFrontMatter } from "../../../types/PostFrontMatter";
import { formatDate } from "../../../utils/format";
import Image from "../Image";
import PageTitle from "../PageTitle";
import ScrollTopAndComment from "../ScrollTopAndComment";
import SectionContainer from "../SectionContainer";
import { BlogSEO } from "../SEO";
interface Props {
  frontMatter: PostFrontMatter;
  authorDetails: AuthorFrontMatter[];
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  children: ReactNode;
}

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}: Props) {
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pt-6 xl:pb-6">
            <div>
              <div>
                <PageTitle>{frontMatter.title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
            <div className="flex items-center">
              <Image
                alt="Lucas Couto"
                height={24}
                width={24}
                sizes="20vw"
                src="/static/images/lucas.png"
                className="rounded-full"
              />
              <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {"Lucas Couto / "}
                {formatDate(frontMatter.date, "DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <div className=" xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pt-4 pb-8 dark:prose-dark">
              {children}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
