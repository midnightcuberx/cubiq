CREATE TYPE "public"."events" AS ENUM('3x3', '2x2', '4x4', '5x5', '6x6', '7x7', 'Square-1', 'Pyraminx', 'Skewb', 'Clock', 'Megaminx', '3 Blind', '4 Blind', '5 Blind', 'FMC', 'OH', 'Multi Blind');--> statement-breakpoint
CREATE TABLE "sessions" (
	"sessionId" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"event" "events" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solves" (
	"solveId" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"sessionId" text NOT NULL,
	"event" "events" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"username" text NOT NULL,
	"authId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_authId_unique" UNIQUE("authId")
);
