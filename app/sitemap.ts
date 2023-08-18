import { getCategories, getGames, getMechanics } from "@/lib/api/boardgamefinds";

const base = "https://boardgamefinds.com"
export default async function sitemap() {

    const allGames = await getGames({ type: "game", limit: 10000 })
    const allMechanics = await getMechanics({ limit: 10000 });
    const allCategories = await getCategories({ limit: 10000 });

    const home = {
        url: base,
        lastModified: new Date()
    };

    const games = allGames!.map(({ title }) => ({
        url: `${base}/games/${title}`,
        lastModified: new Date()
    }))

    const mechanics = allMechanics!.map(({ title }) => ({
        url: `${base}/mechanic/${title}`,
        lastModified: new Date()
    }));

    const catagories = allCategories!.map(({ title }) => ({
        url: `${base}/category/${title}`,
        lastModified: new Date()
    }));

    return [home, ...games, ...mechanics, ...catagories]
}
