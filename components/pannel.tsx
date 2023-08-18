import { shimmer, toBase64 } from "@/lib/constants";

import Game from "@/types/game";
import Image from "next/image";
import Link from "next/link";

export function GamePannel(props: {
  title: string;
  gameItems: Game[] | undefined;
  showN: number;
  linkTo?: string;
}): JSX.Element {
  const { title, gameItems, showN, linkTo } = props;

  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-bold pb-3 text-slate-300">{title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {gameItems!.slice(0, showN).map((mechanic, index) => (
          <div
            key={index}
            className="group p-[1px] bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-400 hover:to-orange-400 rounded-lg"
          >
            <div className="relative w-auto h-32 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-950 rounded-lg transition-all overflow-hidden">
              <Image
                src={`/${mechanic.image}`}
                alt={mechanic.name!}
                fill={true}
                style={{ objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475),
                )}`}
                sizes="(max-width: 206px) 100vw, (max-width: 314px) 50vw, 33vw"
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 rounded-sm transition-all duration-300"
              />

              <Link
                className="absolute inset-0 flex flex-col justify-center items-center w-full h-full text-slate-100 bg-black bg-opacity-70 transition-all duration-300 opacity-100 hover:opacity-0"
                href={`/games/${mechanic.title}#title`}
              >
                <h4 className="text-4xl font-bold">#{index + 1}</h4>
                <h4
                  title={mechanic.name}
                  className="text-xs font-medium text-center truncate w-40"
                >
                  {mechanic.name!.split(":")[0]}
                </h4>
                <h5 className="text-xs font-base text-center truncate w-40 text-zinc-400">
                  {mechanic.name!.split(":")[1]}
                </h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
