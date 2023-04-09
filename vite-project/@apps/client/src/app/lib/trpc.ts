import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'express-server';
// Notice the <AppRouter> generic here

const url = import.meta.env.DEV
	? import.meta.env.VITE_DEV_API_URL
	: import.meta.env.VITE_PROD_API_URL;

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url,
			headers: {
				'Cache-Control': 's-max-age=1, stale-while-revalidate',
			},
		}),
	],
});

export default trpc;
