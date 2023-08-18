import { ObjectId } from 'mongodb';

export default interface Suggestion {
    _id?: ObjectId;
    name: string;
    title: string;
    highlights: {
        score: number;
        path: string;
        texts: {
            value: string;
            type: string;
        }[];
    }[];
}
