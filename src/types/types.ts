import {z} from "zod";
import * as schema from "@/data-layer/adapters/schema";

export enum Events {
    _3x3 = "3x3",
    _2x2 = "2x2",
    _4x4 = "4x4",
    _5x5 = "5x5",
    _6x6 = "6x6",
    _7x7 = "7x7",
    SQUARE_1 = "Square-1",
    PYRAMINX = "Pyraminx",
    SKEWB = "Skewb",
    CLOCK = "Clock",
    MEGAMINX = "Megaminx",
    _3_BLIND = "3 Blind",
    _4_BLIND = "4 Blind",
    _5_BLIND = "5 Blind",
    FMC = "FMC",
    OH = "OH",
    MULTI_BLIND = "Multi Blind",
}

export enum PenaltyTypes {
    DNF= "DNF",
    PLUS_TWO = "+2",
    NONE= "None",
}

export type Solve = typeof schema.solves.$inferSelect;
export type createSolve = typeof schema.solves.$inferInsert;
export type updateSolve = Partial<createSolve>;

export type User = typeof schema.users.$inferSelect;
export type createUser = typeof schema.users.$inferInsert;
export type updateUser = Partial<createUser>;

export type Session = typeof schema.sessions.$inferSelect; // change to include solves later
export type createSession = typeof schema.sessions.$inferInsert;
export type updateSession = Partial<createSession>;