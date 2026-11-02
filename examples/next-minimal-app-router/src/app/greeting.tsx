'use client';

// ^-- hooks can only be used in client components
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '~/trpc/client';

export function Greeting() {
  const trpc = useTRPC();
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const { data } = useSuspenseQuery(
    trpc.greeting.queryOptions({ name: 'client' }),
  );

  return (
    <div className="space-y-1">
      {/*
       * The type is inferred from the router
       * 💡 Tip: Hover over `data` to see the result type
       */}
      <p className="text-2xl font-semibold" data-testid="greeting">
        {data.text}
      </p>
      <p className="text-sm text-muted-foreground">
        {/* `servedAt` is still a `Date` here, thanks to superjson */}
        Served at {data.servedAt.toISOString()}
      </p>
    </div>
  );
}
