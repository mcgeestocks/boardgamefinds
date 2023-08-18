import Mechanic from "@/types/mechanic";
import MechanicsTable from "@/components/mechanics-table";
import { PageProps } from "@/.next/types/app/page";
import { getMechanics } from "@/lib/api/boardgamefinds";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return {
    title: `Top Mechanics | BoardGameFinds`,
    description: `Explore top board games and their mechanic.`,
  };
}

export default async function PostPage({ searchParams }: PageProps) {
  let items;

  switch (searchParams.type) {
    case "mechanic":
      items = await getMechanics({ limit: 200 });
      break;
    default:
      return notFound();
      break;
  }

  return (
    <div className="max-w-2xl flex w-full">
      <article className="grow">
        <h1 className="text-2xl mb-0 font-bold text-slate-300">
          Explore All Mechanics
        </h1>
        <div className="pb-3 text-slate-500"></div>
        {searchParams.type === "mechanic" && (
          <MechanicsTable title="" gameItems={items as Mechanic[]} showN={50} />
        )}
      </article>
    </div>
  );
}
