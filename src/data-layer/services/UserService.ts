import { users } from '@/data-layer/adapters/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/data-layer/adapters/db';
import { User, createUser, updateUser } from '@/types/types';

export class UserService {

    public static async getUserById(userId: string): Promise<User | undefined> {
        const res = await db.query.users.findFirst({
            where: eq(users.authId, userId),
            with: {
                sessions: true,
            }
        });
        return res;
    }

    public static async createUser(user: createUser): Promise<User> {
        const res = await db.insert(users).values(user).returning().onConflictDoNothing();
        return res[0]!;
    }

    public static async updateUser(userId: string, updatedUser: updateUser): Promise<User> {
        const res = await db.update(users)
            .set(updatedUser)
            .where(eq(users.authId, userId))
            .returning();
        return res[0]!;
    }
}
