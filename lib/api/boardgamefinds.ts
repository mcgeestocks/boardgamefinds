import Game from "@/types/game";
import Mechanic from "@/types/mechanic";
import { cache } from 'react'
import clientPromise from "../mongodb";

export const revalidate = 3600

export const getGame = cache(async (id: string): Promise<Game | undefined> => {

    const client = await clientPromise.catch(err => console.error(err));

    if (!client) {
        return undefined
    }

    const collection = client.db('boardgamefinds').collection('bgf');
    const result = await collection.findOne<Game>({ title: id });

    if (result) {
        return result;
    }
})

export const getMechanic = cache(async (title: string): Promise<Mechanic | undefined> => {

    const client = await clientPromise.catch(err => console.error(err));

    if (!client) {
        return undefined
    }

    const collection = client.db('boardgamefinds').collection('bgf');
    const result = await collection.findOne<Mechanic>({ title: title });

    if (result) {
        return result;
    }
})

export const getCategory = cache(async (title: string): Promise<Mechanic | undefined> => {

    const client = await clientPromise.catch(err => console.error(err));

    if (!client) {
        return undefined
    }

    const collection = client.db('boardgamefinds').collection('bgf');
    const result = await collection.findOne<Mechanic>({ title: title });

    if (result) {
        return result;
    }
})

export const getMechanics = cache(async ({
    title,
    name,
    limit,
    rating_min,
    rating_max
}:
    {
        title?: string,
        name?: string,
        description?: string,
        rating_min?: number,
        rating_max?: number,
        limit: number
    }): Promise<Mechanic[] | undefined> => {

    const client = await clientPromise.catch(err => console.error(err));

    if (!client) {
        console.log("no client")
        return undefined
    }
    const filters = []
    filters.push({ "type": "mechanic" })

    if (title) {
        filters.push({ "title": title })
    }
    if (name) {
        filters.push({ "name": name })
    }
    if (rating_min && rating_max) {
        filters.push({ "avg_rating": { "$gte": rating_min, "$lte": rating_max } })
    }

    const collection = client.db('boardgamefinds').collection('bgf');
    let result = await collection.aggregate(
        [{
            $match: {
                "$and": filters
            }
        },
        { $sort: { "avg_rating": -1 } },
        { $limit: limit ? limit : 10 }
        ]
    ).toArray()
    result = result.map((mech) => {
        mech._id = mech._id.toString()
        return mech
    })


    return result as Mechanic[] | undefined;

})

export const getGames = cache(async ({ game_type,
    mechanic,
    category,
    type,
    limit }:
    {
        game_type?: string,
        category?: string,
        mechanic?: string,
        type?: string,
        limit?: number
    }): Promise<Game[] | undefined> => {

    const client = await clientPromise;
    const collection = client.db('boardgamefinds').collection('bgf');

    let filters = []
    if (game_type) {
        filters.push({ "game_type": game_type })
    }
    if (mechanic) {
        filters.push({ "mechanic": mechanic })
    }
    if (category) {
        filters.push({ "category": category })
    }
    if (type) {
        filters.push({ "type": type })
    }

    let result = await collection.aggregate(
        [{
            $match: {
                "$and": filters
            }
        },
        { $sort: { "avg_rating": -1 } },
        { $limit: limit ? limit : 10 }
        ]
    ).toArray()
    result = result.map((game) => {
        game._id = game._id.toString()
        return game
    })

    return result as Game[] | undefined
})

export const getCategories = cache(async ({
    title,
    name,
    avg_rating,
    complexity_bin,
    counter,
    time,
    limit,
    rating_min,
    rating_max
}:
    {
        title?: string,
        name?: string,
        description?: string,
        avg_rating?: number,
        rating_min?: number,
        rating_max?: number,
        complexity_bin?: string,
        counter?: number,
        time?: number,
        limit: number
    }): Promise<Mechanic[] | undefined> => {

    const client = await clientPromise.catch(err => console.error(err));

    if (!client) {
        console.log("no client")
        return undefined
    }
    const filters = []
    filters.push({ "type": "category" })

    if (title) {
        filters.push({ "title": title })
    }
    if (name) {
        filters.push({ "name": name })
    }
    if (rating_min && rating_max) {
        filters.push({ "avg_rating": { "$gte": rating_min, "$lte": rating_max } })
    }

    const collection = client.db('boardgamefinds').collection('bgf');
    let result = await collection.aggregate(
        [{
            $match: {
                "$and": filters
            }
        },
        { $sort: { "avg_rating": -1 } },
        { $limit: limit ? limit : 10 }
        ]
    ).toArray()

    result = result.map((cat) => {
        cat._id = cat._id.toString()
        return cat
    })

    return result as Mechanic[] | undefined;

})

export const search = cache(async ({
    title,
}:
    {
        title?: string,
    }): Promise<Game[] | undefined> => {
    const client = await clientPromise
    let search_aggregate = {
        $search: {
            "index": "search_games",
            "compound": {
                "must": [
                    { "text": { "query": title, "path": "name", "fuzzy": {} } }
                ],
            }
        }
    }

    let projection = {
        $project: {
            "title": 1,
            "name": 1,
        }
    };

    let results = await client.db('boardgamefinds').collection('bgf').aggregate([search_aggregate, projection]).limit(10).toArray()

    return results as Game[] | undefined

})

export const autocomplete = cache(async ({
    title,
}:
    {
        title?: string,
    }): Promise<any | undefined> => {
    const client = await clientPromise
    let search_aggregate = [{
        '$search': {
            "index": "search_autocomplete",
            "autocomplete": {
                'query': title,
                'path': 'name',
            },
            'highlight': {
                'path': ['name']
            }
        }
    }, {
        '$limit': 3
    }, {
        '$project': {
            'name': 1,
            'title': 1,
            'highlights': {
                '$meta': 'searchHighlights'
            }
        }
    }]
    let results = await client.db('boardgamefinds').collection('bgf').aggregate(search_aggregate).toArray()
    return results
})

