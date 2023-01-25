import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { Hero, Layout } from "../components/common";
import FeaturedPosts from "../components/common/FeaturedPosts";
import { getAllFilesFrontMatter } from "../lib/mdx";
import { PostFrontMatter } from "../types/PostFrontMatter";

// export const getStaticProps: GetStaticProps<{
//   posts: PostFrontMatter[]
// }> = async () => {
//   const posts = await getAllFilesFrontMatter('blog')

//   return { props: { posts } }
// }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: PostFrontMatter[] }) {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <Hero />
        <FeaturedPosts posts={posts} />
      </div>
    </Layout>
  );
}
