/**
 * This is a server component. It runs on the server only.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/ui/components/card';
import { Skeleton } from '@shared/ui/components/skeleton';
import { Suspense } from 'react';
import { caller, HydrateClient, prefetch, trpc } from '~/trpc/server';
import { Greeting } from './greeting';
import { Messages } from './messages';

export default async function Home() {
  // 1. Start the queries early, without awaiting them.
  //    The input must match the client's, as it is part of the query key.
  prefetch(trpc.greeting.queryOptions({ name: 'client' }));
  prefetch(trpc.message.list.queryOptions());

  // 2. Data that is only needed on the server: call the router directly.
  //    This bypasses the query cache, so it is not sent to the client.
  const serverGreeting = await caller.greeting({ name: 'server' });

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-brand">tRPC</span> Next.js App Router Minimal
            Starter
          </h1>
          <p className="text-sm text-muted-foreground">
            The Next.js App Router with @trpc/tanstack-react-query
          </p>
        </div>
      </header>
      {/* 3. Hand everything prefetched above to the client components */}
      <HydrateClient>
        <main className="mx-auto grid max-w-4xl gap-6 p-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Query</CardTitle>
              <CardDescription>
                <code>greeting</code>, prefetched in a server component and read
                with <code>useSuspenseQuery</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <Skeleton
                    className="h-8 w-40"
                    aria-label="Loading greeting"
                  />
                }
              >
                <Greeting />
              </Suspense>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Server caller</CardTitle>
              <CardDescription>
                <code>greeting</code>, called with <code>caller</code> and
                rendered on the server only
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className="text-2xl font-semibold"
                data-testid="server-greeting"
              >
                {serverGreeting.text}
              </p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Mutation</CardTitle>
              <CardDescription>
                <code>message.add</code> with <code>useMutation</code>, then
                invalidating <code>message.list</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Messages />
            </CardContent>
          </Card>
        </main>
      </HydrateClient>
    </div>
  );
}
