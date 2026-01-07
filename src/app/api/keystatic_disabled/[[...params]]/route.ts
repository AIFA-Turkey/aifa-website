import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const dynamic = 'force-dynamic';

const { GET: _GET, POST: _POST } = makeRouteHandler({
    config,
});

export const GET = (req: any, ctx: any) => {
    console.log(`[Keystatic API] GET ${req.url}`);
    return _GET(req);
}
export const POST = (req: any, ctx: any) => {
    console.log(`[Keystatic API] POST ${req.url}`);
    return _POST(req);
}
