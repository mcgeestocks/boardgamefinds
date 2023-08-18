"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Suggestion from "@/types/suggestion";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const [sug_games, setSugGames] = useState<Suggestion[] | undefined>();
  const [game, setGame] = useState("");
  const [slug, setSlug] = useState("");

  const handleSelected = useCallback(
    (val: Suggestion) => {
      setGame(val.name);
      setSlug(val.title);
      if (val.title != "") {
        router.push(`/games/${val.title}`);
      }
      setGame("");
      setSlug("");
      setSugGames(undefined);
      setShow(false);
    },
    [router],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (slug != "") {
      router.push(`/games/${slug}`);
    }
    setGame("");
    setSlug("");
    setShow(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
    if (e.target.value.length > 1) {
      await fetch(`/api/suggest?title=${e.target.value}`)
        .then((res) => res.json())
        .then((res: Suggestion[]) => {
          if (res !== undefined && res.length >= 1) {
            setSugGames(res);
            setSlug(res[0].title);
          }
        });
    } else {
      setSugGames(undefined);
    }
  };

  const handleClickAway = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickAway && handleClickAway();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickAway]);

  return (
    <div ref={ref}>
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center focus:w-64"
        >
          <input
            className="border border-slate-500 bg-slate-950 font-normal text-sm my-2 rounded flex w-full outline-none py-1 px-2 focus:w-64 transition-all placeholder-slate-600 ease-in-out delay-75 duration-300"
            type="text"
            placeholder={"Search"}
            value={game}
            onChange={handleChange}
            onFocus={() => setShow(true)}
          />
        </form>
        {show && sug_games && sug_games.length >= 1 && (
          <div className="text-xs absolute text-slate-800 px-2 py-2 font-normal bg-slate-900 w-full rounded-md truncate divide-y divide-slate-400 border border-slate-600 shadow shadow-slate-900">
            {sug_games?.map((res, index) => (
              <div key={index} onClick={() => handleSelected(res)}>
                <div className="select-none cursor-pointer pl-2 py-2 truncate font-semibold hover:bg-slate-800  text-slate-300 hover:text-slate-50 transition-all ease-in-out duration-75">
                  {res.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
