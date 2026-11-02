# Next.js App Router + tRPC

A minimal Next.js App Router app with tRPC and [`@trpc/tanstack-react-query`](https://trpc.io/docs/client/tanstack-react-query), following [Set up with Next.js App Router](https://trpc.io/docs/client/nextjs/app-router-setup).

It shows:

- A route handler using the fetch adapter: [`src/app/api/trpc/[trpc]/route.ts`](./src/app/api/trpc/[trpc]/route.ts)
- Prefetching in a server component and reading the result with `useSuspenseQuery`: [`src/app/page.tsx`](./src/app/page.tsx), [`src/app/greeting.tsx`](./src/app/greeting.tsx)
- Calling the router directly from a server component with `caller`
- A mutation that invalidates a query: [`src/app/messages.tsx`](./src/app/messages.tsx)
- [superjson](https://github.com/flightcontrolhq/superjson) as the data transformer, on the link and when hydrating the query client

For the Pages Router, see [next-minimal-starter](../next-minimal-starter/).

## File structure

```graphql
src
├── app
│   ├── api/trpc/[trpc]/route.ts  # <-- tRPC HTTP handler
│   ├── layout.tsx                # <-- mounts TRPCReactProvider
│   ├── page.tsx                  # <-- server component: prefetch + caller
│   ├── greeting.tsx              # <-- client component: query
│   └── messages.tsx              # <-- client component: mutation
└── trpc
    ├── init.ts                   # <-- initTRPC & context
    ├── routers/_app.ts           # <-- app router
    ├── client.tsx                # <-- provider & useTRPC() for client components
    ├── query-client.ts           # <-- shared QueryClient factory
    └── server.tsx                # <-- prefetch, HydrateClient & caller for server components
```

## Setup

```bash
npx create-next-app --example https://github.com/trpc/trpc/tree/main/examples/next-minimal-app-router trpc-app-router
cd trpc-app-router
npm i
npm run dev
```

## Development

```bash
npm run dev        # starts next.js
npm run test-dev   # runs the Playwright tests against the dev server
```
