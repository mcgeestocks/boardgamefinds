import { ObjectId } from "mongodb";

export default interface Game {
    _id?: ObjectId
    title: string
    name: string
    image: string
    description: string
    avg_rating: string // TODO: change to number
    game_type: string[]
    mechanic: string[]
    publisher: string[]
    designer: string[]
    category: string[]
    artist: string[]
    year: number
    time_bin: number
    complexity_bin: string
    min_players_best: number
    max_players_best: number
}