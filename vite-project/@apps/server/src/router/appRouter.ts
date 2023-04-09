import { router } from '../lib/trpc';
import { todoRouter as todos } from './todoRouter';

export const appRouter = router({
	todos,
});

export type AppRouter = typeof appRouter;
