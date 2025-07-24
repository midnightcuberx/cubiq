import { Events } from "@/types/types";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    username: text("username").notNull().unique(),
    authId: text("authId").notNull().unique(),
    createdAt: timestamp("createdAt", {mode: "date"}).notNull().defaultNow(),
});

export const eventsEnum = pgEnum("events", Object.values(Events) as [Events, ...Events[]]);

export const sessions = pgTable("sessions", {
    sessionId: serial("sessionId").primaryKey(),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt", {mode: "date"}).notNull().defaultNow(),
    event: eventsEnum("event").notNull(),
});

export const solves = pgTable("solves", {
    solveId: serial("solveId").primaryKey(),
    userId: text("userId").notNull(),
    sessionId: text("sessionId").notNull(),
    event: eventsEnum("event").notNull(),
    createdAt: timestamp("createdAt", {mode: "date"}).notNull().defaultNow(),
});

export const userRelations = relations(users, ({many}) => ({
    sessions: many(sessions),
    solves: many(solves),
}));

export const sessionRelations = relations(sessions, ({one}) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.authId],
    }),
}));

export const sessionRelations2 = relations(sessions, ({many}) => ({
    solves: many(solves),
}));

export const solveRelations = relations(solves, ({one}) => ({
    user: one(users, {
        fields: [solves.userId],
        references: [users.authId],
    }),
    session: one(sessions, {
        fields: [solves.sessionId],
        references: [sessions.sessionId],
    }),
}));