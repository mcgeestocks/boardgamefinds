import { NextRequest, NextResponse } from 'next/server'

import Game from '@/types/game';
import { autocomplete } from '@/lib/api/boardgamefinds';

export async function GET(request: NextRequest) {

    const url = new URL(request.nextUrl);
    const params = url.searchParams;
    let result: Game[] | undefined = undefined;

    if (params.has('title')) {
        result = await autocomplete({
            title: params.get('title')!
        })
    }

    if (result && result.length > 0) {
        return NextResponse.json(result, { status: 200 })
    }
    if (result && result.length === 0) {
        return NextResponse.json({ error: "none" }, { status: 404 })
    }

}