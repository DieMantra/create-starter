import { Todo } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '../lib/prismaClient';
import { publicProcedure, router } from '../lib/trpc';

interface TodoResponses {
	status: 'success' | 'failed';
	message: string;
}
interface GetAllTodosResponse extends TodoResponses {
	payload: Todo[] | undefined;
}
export const todoRouter = router({
	getAllTodos: publicProcedure
		.input(z.object({ userId: z.number() }))
		.query(async ({ input }): Promise<GetAllTodosResponse> => {
			const todos = await prisma.user.findUnique({
				where: {
					id: input.userId,
				},
				select: {
					todos: true,
				},
			});
			const response: GetAllTodosResponse = {
				payload: todos?.todos,
				status: todos?.todos ? 'success' : 'failed',
				message: todos?.todos ? 'Found your data' : 'failed to find todos',
			};
			return response;
		}),
});
