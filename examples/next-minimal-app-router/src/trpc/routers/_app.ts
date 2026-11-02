import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';

// In-memory store to keep the example dependency-free.
// It resets when the server restarts.
const messages: { id: number; text: string; createdAt: Date }[] = [];

export const appRouter = createTRPCRouter({
  greeting: baseProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z.object({
        name: z.string().nullish(),
      }),
    )
    .query((opts) => {
      return {
        text: `hello ${opts.input.name ?? 'world'}`,
        // `Date` survives the trip to the client thanks to superjson
        servedAt: new Date(),
      };
    }),
  message: createTRPCRouter({
    list: baseProcedure.query(() => {
      return messages;
    }),
    add: baseProcedure
      .input(
        z.object({
          text: z.string().trim().min(1).max(100),
        }),
      )
      .mutation((opts) => {
        const message = {
          id: messages.length + 1,
          text: opts.input.text,
          createdAt: new Date(),
        };
        messages.push(message);
        return message;
      }),
  }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
