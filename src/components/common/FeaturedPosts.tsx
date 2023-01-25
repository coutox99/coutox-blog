import React from "react";
import { PostFrontMatter } from "../../types/PostFrontMatter";
import { ArticleCard } from "../ui";

type FeaturedPostsProps = {
  posts: PostFrontMatter[];
};

const MAX_DISPLAY = 5;

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Posts Recentes
      </h3>
      <div className="">
        {!posts.length && "Nenhum post encontrado."}
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => (
          <ArticleCard key={frontMatter.slug} article={frontMatter} />
        ))}
      </div>
    </div>
  );
}
