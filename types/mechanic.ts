import { ObjectId } from 'mongodb'

export default interface Mechanic {
    _id?: ObjectId
    title: string
    name: string
    description: string
    avg_rating: number
    complexity_bin: string
    counter: number
    time: number
}
