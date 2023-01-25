import React from "react";
import fs from "fs";
import generateRss from "../../lib/generate-rss";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "../../lib/mdx";
import { AuthorFrontMatter } from "../../types/AuthorFrontMatter";
import { Toc } from "../../types/Toc";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PostFrontMatter } from "../../types/PostFrontMatter";
import { MDXLayoutRenderer } from "../../components/common/MDXComponents";
import PageTitle from "../../components/common/PageTitle";
import { Layout } from "../../components/common";

const DEFAULT_LAYOUT = "PostLayout";

export async function getStaticPaths() {
  const posts = getFiles("blog");
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
}

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter };
  authorDetails: AuthorFrontMatter[];
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}> = async ({ params }) => {
  const slug = (params.slug as string[]).join("/");
  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === slug
  );
  const prev: { slug: string; title: string } = allPosts[postIndex + 1] || null;
  const next: { slug: string; title: string } = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", slug);
  // @ts-ignore
  const authorList = post.frontMatter.authors || ["default"];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author]);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  };
};

export default function Blog({
  post,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <Layout>
      {"draft" in frontMatter && frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Em Construção{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </Layout>
  );
}