import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { ComponentProps } from "react";
import { Layout } from "../components/common";
import ListLayout from "../components/common/layouts/ListLayout";
import SectionContainer from "../components/common/SectionContainer";
import { PageSEO } from "../components/common/SEO";
import siteMetadata from "../data/siteMetadata";
import { getAllFilesFrontMatter } from "../lib/mdx";

export const POSTS_PER_PAGE = 5;

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>["posts"];
  initialDisplayPosts: ComponentProps<typeof ListLayout>["initialDisplayPosts"];
  pagination: ComponentProps<typeof ListLayout>["pagination"];
}> = async () => {
  const posts = await getAllFilesFrontMatter("blog");
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination } };
};

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        <ListLayout
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          title="Todos os Posts"
        />
      </SectionContainer>
    </Layout>
  );
}
