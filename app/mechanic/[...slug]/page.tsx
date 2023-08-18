import { getGames, getMechanic } from "@/lib/api/boardgamefinds";

import Game from "@/types/game";
import { GamePannel } from "@/components/pannel";
import Link from "next/link";
import Mechanic from "@/types/mechanic";
import { Metadata } from "next";
import { PageProps } from "@/.next/types/app/page";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";
import Table from "@/components/table";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const mechanic: Mechanic | undefined = await getMechanic(
    params.slug.join("/"),
  );

  if (!mechanic) {
    return {};
  }

  return {
    title: mechanic.name + " | BoardGameFinds",
    description: `Explore ${mechanic.name} in Board Games}. See the top 6 games with ${mechanic.name} and more. `,
    openGraph: {
      title: mechanic.name + " | BoardGameFinds",
      description: `Explore ${mechanic.name} in Board Games}. See the top 6 games with ${mechanic.name} and more. `,
      locale: "en_US",
      type: "website",
      url: `https://boardgamefinds.com/mechanic/${mechanic.title}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const mechanic: Mechanic | undefined = await getMechanic(
    params.slug.join("/"),
  );

  if (!mechanic) {
    notFound();
  }

  const allGames: Game[] | undefined = await getGames({
    mechanic: mechanic!.name,
    limit: 500,
  });

  return (
    <article className="">
      <div className="flex justify-between">
        <h1
          id="title"
          className="text-2xl font-bold sm:text-3xl text-slate-300"
        >
          Mechanic:{" "}
          <em className="text-slate-200 not-italic">{mechanic?.name}</em>
        </h1>
        <Link
          className=" transition-all ease-in-out delay-50"
          scroll={false}
          href={`/mechanic/${mechanic?.title}#all`}
        >
          <h2 className="text-sm font-bold pb-3 baseline text-slate-500 hover:text-yellow-500 transition-all delay-75 align-bottom whitespace-nowrap">
            See All
          </h2>
        </Link>
      </div>
      <Suspense>
        <GamePannel
          title="Top 6 Games"
          gameItems={await getGames({ mechanic: mechanic.name })}
          showN={6}
        />
      </Suspense>
      <div className="space-y-3">
        <ReactMarkdown className="whitespace-pre-wrap">
          {mechanic.description}
        </ReactMarkdown>
      </div>
      <div className="bg-slate-950">
        <h3 id="all" className="text-xl font-bold text-slate-400 pt-3 pb-3">
          All Games Including: {mechanic.name}
        </h3>
        {allGames && <Table title={"Title"} gameItems={allGames} showN={20} />}
      </div>
    </article>
  );
}
