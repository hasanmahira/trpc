'use client';

import { Button } from '@shared/ui/components/button';
import { Input } from '@shared/ui/components/input';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { useTRPC } from '~/trpc/client';

function MessageList() {
  const trpc = useTRPC();
  const { data: messages } = useSuspenseQuery(trpc.message.list.queryOptions());

  if (messages.length === 0) {
    return <p className="text-sm text-muted-foreground">No messages yet.</p>;
  }
  return (
    <ul className="space-y-1 text-sm" data-testid="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}

function AddMessageForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const addMessage = useMutation(
    trpc.message.add.mutationOptions({
      onSuccess: async () => {
        // Refetch the list so it includes the new message
        await queryClient.invalidateQueries({
          queryKey: trpc.message.list.queryKey(),
        });
      },
    }),
  );

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const text = new FormData(form).get('text');
        if (typeof text !== 'string') return;
        addMessage.mutate(
          { text },
          {
            onSuccess: () => form.reset(),
          },
        );
      }}
    >
      <Input
        name="text"
        placeholder="Write a message"
        aria-label="Message"
        required
        maxLength={100}
        disabled={addMessage.isPending}
      />
      <Button type="submit" disabled={addMessage.isPending}>
        {addMessage.isPending ? 'Adding…' : 'Add'}
      </Button>
    </form>
  );
}

export function Messages() {
  return (
    <div className="space-y-4">
      <AddMessageForm />
      <Suspense
        fallback={<p className="text-sm text-muted-foreground">Loading…</p>}
      >
        <MessageList />
      </Suspense>
    </div>
  );
}
