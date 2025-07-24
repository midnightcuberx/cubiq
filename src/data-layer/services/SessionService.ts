import { sessions, solves } from '@/data-layer/adapters/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/data-layer/adapters/db';
import { createSession, Session, updateSession } from '@/types/types';


export class SessionService {
    public static async getSessions(): Promise<Session[]> {
        const res = await db.query.sessions.findMany();
        return res;
    }

    public static async getSessionsByUserId(userId: string): Promise<Session[]> {
        const res = await db.query.sessions.findMany({
            where: eq(sessions.userId, userId),
        });
        return res;
    }

    public static async getSessionById(sessionId: number): Promise<Session | undefined> {
        const res = await db.query.sessions.findFirst({
            where: eq(sessions.sessionId, sessionId),
            with: {
                solves: true
            }
        });
        return res;
    }

    public static async createSession(session: createSession): Promise<Session> {
        const res = await db.insert(sessions).values(session).returning().onConflictDoNothing();
        return res[0]!;
    }

    public static async updateSession(sessionId: number, updatedSession: updateSession): Promise<Session> {
        const res = await db.update(sessions)
            .set(updatedSession)
            .where(eq(sessions.sessionId, sessionId))
            .returning();
        return res[0]!;
    }

    public static async deleteSession(sessionId: number): Promise<void> {
        await db.transaction(async (tx) => {
            await tx.delete(sessions).where(eq(sessions.sessionId, sessionId));
            await tx.delete(solves).where(eq(solves.sessionId, sessionId));
        });
    }
}
