/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * @see https://trpc.io/docs/client/nextjs/app-router-setup
 */
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

/**
 * Takes `headers` so the same function works in the route handler
 * (request headers) and in server components (`next/headers`).
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  // const session = await auth(opts.headers);
  return {
    userAgent: opts.headers.get('user-agent'),
  };
};

const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    /**
     * Must match the `transformer` on the client link and the
     * `serializeData` / `deserializeData` options of the QueryClient
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
  });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
