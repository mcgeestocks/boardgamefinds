import { Fragment, Suspense } from "react";
import { getGames, getMechanics } from "@/lib/api/boardgamefinds";

import { GamePannel } from "@/components/pannel";
import Link from "next/link";

export default async function Home() {
  const strategyGames = await getGames({ game_type: "Strategy Game" });
  const familyGames = await getGames({ game_type: "Family Game" });
  const famAdventureGames = await getGames({
    game_type: "Family Game",
    category: "Adventure",
  });
  const trendingMechanics = await getMechanics({
    rating_min: 3,
    rating_max: 900,
    limit: 10,
  });

  return (
    <div className="space-y-5">
      <div>
        <div>
          <h2 className="text-slate-500  bg-slate-900 p-4 rounded-lg mb-6">
            Welcome to an encyclopedia of 4,000+ Board Games, mechanics and
            themes! Click a mechanic below to start exploring!
          </h2>
        </div>
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-bold pb-3 text-slate-300">
            Trending Mechanics
          </h3>
          <Link href="/explore?type=mechanic">
            <h3 className="text-sm font-bold pb-3 baseline text-slate-200 hover:text-yellow-500 transition-all delay-75">
              See All
            </h3>
          </Link>
        </div>
        <div className="text-sm flex flex-wrap">
          <Suspense fallback={<div>Loading...</div>}>
            {trendingMechanics &&
              trendingMechanics.map((mechanic, index) => {
                return (
                  <Fragment key={index}>
                    <Link
                      className="text-slate-300 hover:text-yellow-400 transition-all ease-in-out delay-50"
                      key={index}
                      href={`/mechanic/${mechanic.name
                        .replace(/[^\wa-zA-Z0-9]/g, "")
                        .toLowerCase()}#title`}
                    >
                      <div className="bg-slate-900/50 border border-slate-800 px-3 py-1 my-1 rounded-full mx-1 shrink-0 whitespace-nowrap">
                        {mechanic.name}
                      </div>
                    </Link>
                  </Fragment>
                );
              })}
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <GamePannel
          title="Top 8 Strategy Games:"
          gameItems={strategyGames}
          showN={6}
          linkTo="strategygame"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <GamePannel
          title="Top 8 Family Games:"
          gameItems={familyGames}
          showN={6}
          linkTo="strategygame"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <GamePannel
          title="Top 8 Family Adventure Games:"
          gameItems={famAdventureGames}
          showN={6}
          linkTo="strategygame"
        />
      </Suspense>
    </div>
  );
}
