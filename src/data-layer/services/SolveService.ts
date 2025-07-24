import { solves } from '@/data-layer/adapters/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/data-layer/adapters/db';
import { createSolve, Solve } from '@/types/types';


export class SolveService {
    public static async getSolves(): Promise<Solve[]>{
        const res = await db.query.solves.findMany();
        return res;
    }
    public static async getSolvesByUserId(userId: string): Promise<Solve[]>{
        const res = await db.query.solves.findMany({
            where: eq(solves.userId, userId)
        });
        return res;
    }
    public static async getSolveById(solveId: number): Promise<Solve | undefined>{
        const res = await db.query.solves.findFirst({
            where: eq(solves.solveId, solveId)
        });
        return res;
    }

    public static async getSolvesBySessionId(sessionId: string): Promise<Solve[]>{
        const res = await db.query.solves.findMany({
            where: eq(solves.sessionId, sessionId)
        });
        return res;
    }

    public static async createSolve(solve: createSolve): Promise<Solve> {
        const res = await db.insert(solves).values(solve).returning().onConflictDoNothing();
        return res[0];
    }

    public static async updateSolve(solveId: number, updatedSolve: Partial<Solve>): Promise<Solve | undefined> {
        const res = await db.update(solves)
            .set(updatedSolve)
            .where(eq(solves.solveId, solveId))
            .returning();
        return res[0];
    }

    public static async deleteSolve(solveId: number): Promise<void> {
        await db.delete(solves).where(eq(solves.solveId, solveId));
    }

    public static async deleteSolvesBySessionId(sessionId: string): Promise<void> {
        await db.delete(solves).where(eq(solves.sessionId, sessionId));
    }

    /*public static async getUser(userId: string){
        const res = await db.query.users.findFirst({
            where: eq(users.authId, userId),
            with: {
                sessions: {
                    with: {
                        solves: true
                    }
                }
            }
        });
        return { user: res };
    }*/
}
