import { shimmer, toBase64 } from "@/lib/constants";

import { Fragment } from "react";
import Game from "@/types/game";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PageProps } from "@/.next/types/app/page";
import ReactMarkdown from "react-markdown";
import { getGame } from "@/lib/api/boardgamefinds";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const game: Game | undefined = await getGame(params.slug.join("/"));

  if (!game) {
    return {};
  }

  const description = `Explore the board game ${game.name} (${
    game.year
  }) a ${game.game_type?.at(0)} by ${game.designer?.at(0)}.`;
  const fill = 160 - description.length;
  return {
    title: game.name + " | BoardGameFinds",
    description: `${description} ${
      fill > 0 ? game.description.slice(0, fill) : ""
    }...`,
    openGraph: {
      title: game.name + " | BoardGameFinds",
      description: `${description} ${
        fill > 0 ? game.description.slice(0, fill) : ""
      }...`,
      locale: "en_US",
      images: `/${game!.image}`,
      url: `https://boardgamefinds.com/games/${game.title}`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const game: Game | undefined = await getGame(params.slug.join("/"));

  if (!game) {
    notFound();
  }

  return (
    <article className="">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="pr-3 shrink-0 w-auto">
          <Image
            src={`/${game.image}`}
            alt={game.name!}
            height={120}
            width={120}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475),
            )}`}
            placeholder="blur"
            style={{ objectFit: "cover" }}
            className="rounded-sm transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl mb-0 pb-0 mt-0 pt-0 font-bold text-slate-200">
              {game.name}{" "}
              <em className=" not-italic text-slate-500">({game.year})</em>
            </h1>
            <h2 className="text-xs text-slate-500 font-medium mb-0 pb-0 pt-1">
              Design:{" "}
              <em className="text-slate-400 not-italic">
                {game.designer && (
                  <Fragment>
                    {game.designer.slice(0, 3).map((designer, index) => (
                      <span key={index}>
                        {designer}
                        {index < 2 && ", "}
                      </span>
                    ))}
                    {game.designer!.length > 3 && (
                      <span> and {game.designer!.length - 3} Others </span>
                    )}
                  </Fragment>
                )}
              </em>
            </h2>
            <h2 className="text-xs text-slate-500 font-medium mb-0 pb-0 mt-0 pt-0">
              Art:{" "}
              <em className="text-slate-400 not-italic">
                {game.artist && (
                  <Fragment>
                    {game.artist.slice(0, 3).map((artist, index) => (
                      <span key={index}>
                        {artist}
                        {index < 2 && ", "}
                      </span>
                    ))}
                    {game.artist!.length > 3 && (
                      <span> and {game.artist!.length - 3} Others </span>
                    )}
                  </Fragment>
                )}
              </em>
            </h2>
          </div>
          <h2 className="text-xs font-medium mb-0 pb-0 mt-0 pt-0 text-slate-500 truncate shrink">
            Publishing:{" "}
            <em className="text-slate-400 not-italic">
              {game.publisher && (
                <Fragment>
                  {game.publisher.slice(0, 3).map((pub, index) => (
                    <span key={index}>
                      {pub}
                      {index < 2 && ", "}
                    </span>
                  ))}
                  {game.publisher!.length > 5 && (
                    <span> and {game.publisher!.length - 5} Others </span>
                  )}
                </Fragment>
              )}
            </em>
          </h2>
        </div>
      </div>
      <div className=" bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-600 p-[1px] rounded-lg my-4 shadow-md shadow-slate-950">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 bg-slate-900 rounded-lg p-4">
          <div className="text-center">
            <h3 className="font-bold text-lg">{game.game_type?.at(0)}</h3>
            <h4 className="text-xs -mt-1 text-slate-400">Meta Category</h4>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{game.time_bin}</h3>
            <h4 className="text-xs -mt-1 text-slate-400">Duration</h4>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{game.complexity_bin}</h3>
            <h4 className="text-xs -mt-1 text-slate-400"> Difficulty</h4>
          </div>
          <div className="text-center">
            {game.min_players_best === game.max_players_best ? (
              <h3 className="font-bold text-lg">
                {game.min_players_best} Players
              </h3>
            ) : (
              <h3 className="font-bold text-lg">
                {game.min_players_best} - {game.max_players_best} Players
              </h3>
            )}
            <h4 className="text-xs -mt-1 text-slate-400">Best With</h4>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-300 mb-1 mt-2">
          Categories
        </h3>
        <div className="text-sm flex flex-wrap">
          {game.category &&
            game.category.map((category: string, index) => (
              <Fragment key={index}>
                <Link
                  className="text-slate-300 hover:text-yellow-400 transition-all ease-in-out delay-50"
                  href={`/category/${category
                    .replace(/[^\wa-zA-Z0-9]/g, "")
                    .toLowerCase()}`}
                >
                  <div className="bg-slate-900/50 border border-slate-800 px-3 py-1 rounded-full mx-1 shrink-0 whitespace-nowrap my-1">
                    {category}
                  </div>
                </Link>
              </Fragment>
            ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-300 mb-1 mt-4">
          Mechanics
        </h3>
        <div className="text-sm flex flex-wrap">
          {game.mechanic &&
            game.mechanic.map((mechanic, index) => {
              return (
                <Fragment key={mechanic}>
                  <Link
                    className="text-slate-300 hover:text-yellow-400 transition-all ease-in-out delay-50"
                    scroll={false}
                    key={mechanic}
                    href={`/mechanic/${mechanic
                      .replace(/[^\wa-zA-Z0-9]/g, "")
                      .toLowerCase()}#title`}
                  >
                    <div className="bg-slate-900/50 border border-slate-800 px-3 py-1 my-1 rounded-full mx-1 shrink-0 whitespace-nowrap">
                      {mechanic}
                    </div>
                  </Link>
                </Fragment>
              );
            })}
        </div>
      </div>

      <div className="text-sm text-slate-200">
        <h3 className="text-lg font-bold text-slate-300 mb-1 mt-4">
          Description
        </h3>
        <ReactMarkdown className="whitespace-pre-wrap">
          {game.description}
        </ReactMarkdown>
      </div>
    </article>
  );
}
