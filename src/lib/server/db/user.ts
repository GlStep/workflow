import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { userTable, type User } from '$lib/server/db/schema';

export async function createUser(githubId: number, githubUsername: string): Promise<User> {
	const [row] = await db
		.insert(userTable)
		.values({ githubId: githubId, username: githubUsername })
		.returning();
	if (row === null) {
		throw new Error('Failed to create user');
	}
	return row;
}

export async function getUserFromGitHubId(githubId: number): Promise<User> {
	const [row] = await db.select().from(userTable).where(eq(userTable.githubId, githubId));
	if (row === null) {
		throw new Error('Failed to get user from GitHub ID');
	}
	return row;
}
