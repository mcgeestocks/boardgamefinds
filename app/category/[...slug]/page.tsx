import { getCategory, getGames } from "@/lib/api/boardgamefinds";

import Game from "@/types/game";
import { GamePannel } from "@/components/pannel";
import { Metadata } from "next";
import { PageProps } from "@/.next/types/app/page";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";
import Table from "@/components/table";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = await getCategory(params.slug.join("/"));

  if (!category) {
    return {};
  }

  return {
    title: category.name + " | BoardGameFinds",
    description: `Top ${category.name} Board Games. ${category.description
      .slice(0, 50)
      .replace(/[\n#]/g, " ")}...`,
    openGraph: {
      title: category.name + " | BoardGameFinds",
      description: `Top ${category.name} Board Games. ${category.description
        .slice(0, 50)
        .replace(/[\n#]/g, " ")}...`,
      locale: "en_US",
      type: "website",
      url: `https://boardgamefinds.com/category/${category.title}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const category = await getCategory(params.slug.join("/"));

  if (!category) {
    notFound();
  }

  const allGames: Game[] | undefined = await getGames({
    category: category!.name,
    limit: 500,
  });

  return (
    <article className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl text-slate-400">
          Category:{" "}
          <em className="text-slate-200 not-italic">{category.name}</em>
        </h1>
      </div>
      <Suspense>
        <GamePannel
          title="Top 6 Games"
          gameItems={await getGames({ category: category.name })}
          showN={6}
        />
      </Suspense>
      <div className="space-y-3">
        <ReactMarkdown className="whitespace-pre-wrap">
          {category.description}
        </ReactMarkdown>
      </div>
      <div className="bg-slate-950">
        <h3 id="all" className="text-xl font-bold text-slate-400 pt-3 pb-3">
          All Games Including: {category.name}
        </h3>
        {allGames && <Table title={"Title"} gameItems={allGames} showN={20} />}
      </div>
    </article>
  );
}
