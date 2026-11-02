/**
 * The App Router uses the fetch adapter, not `@trpc/server/adapters/next`.
 * @see https://trpc.io/docs/server/adapters/fetch
 */
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '~/trpc/init';
import { appRouter } from '~/trpc/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
  });

// Queries are sent as GET and mutations as POST, so export both
export { handler as GET, handler as POST };
