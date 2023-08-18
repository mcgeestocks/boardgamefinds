"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import Mechanic from "@/types/mechanic";
import Link from "next/link";

export default function MechanicsTable(props: {
  title: string;
  gameItems: Mechanic[];
  showN: number;
}) {
  const { title, gameItems, showN } = props;
  const [items, setItems] = useState(showN);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItems(items + 50);
        }
      },
      { threshold: 1 }
    );

    const target = observerTarget.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [items, observerTarget]);

  return (
    <div className="overflow-x-scroll">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-slate-900 rounded border-b border-slate-800 py-0.5 sm:py-1 text-xs sm:text-sm text-slate-700 font-base">
            <th className="text-left px-1 sm:px-3 py-0.5 sm:py-1 rounded-tl-lg ">
              #
            </th>
            <th className="text-center">Mechanic Name</th>
            <th className="text-center">Games</th>
            <th className="text-center">Difficulty</th>
            <th className="text-center rounded-tr-lg">Duration</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {gameItems.slice(0, items).map((game: any, index) => (
            <tr
              className="even:bg-slate-900 odd:bg-slate-950/50 "
              key={game._id}
            >
              <td className="text-xs sm:text-sm px-1 py-1.5 sm:px-3 sm:py-2">
                {index + 1}
              </td>
              <td className="text-xs sm:text-sm truncate">
                <Link
                  className="text-slate-400 hover:text-yellow-400 transition-all ease-in-out delay-50"
                  href={`/mechanic/${game.title}`}
                >
                  {game.name.length > 25
                    ? game.name.slice(0, 25) + "..."
                    : game.name}
                </Link>
              </td>
              <td className="text-xs sm:text-sm">{game.count}</td>
              <td className="text-xs sm:text-sm">{game.complexity_bin}</td>
              <td className="text-xs sm:text-sm">{game.time.toFixed(0)} Min</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={observerTarget}></div>
    </div>
  );
}
