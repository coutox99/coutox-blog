import React from "react";
import cn from "classnames";
import Link from "next/link";
import { PostFrontMatter } from "../../types/PostFrontMatter";
import { formatDate } from "../../utils/format";

type ArticleCardProps = {
  article: PostFrontMatter;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "cursor-pointer transform hover:scale-[1.01] transition-all",
        "rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1"
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
        <div>
          <div className="text-xs">{formatDate(article.date)}</div>
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
              {article.title}
            </h4>
          </div>
        </div>
        <div className="flex space-x-1">
          {article.tags.map((tag) => (
            <div className="flex text-white p-1 text-xs rounded bg-indigo-500" key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    </Link>
  );
}
