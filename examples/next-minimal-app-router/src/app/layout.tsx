import type { Metadata } from 'next';
import { TRPCReactProvider } from '~/trpc/client';
import './globals.css';

export const metadata: Metadata = {
  title: 'tRPC Next.js App Router Minimal Starter',
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>{props.children}</TRPCReactProvider>
      </body>
    </html>
  );
}
