import { pgTable, text, timestamp, boolean, uuid, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text('name').notNull(),
					email: text('email').notNull().unique(),
					emailVerified: boolean('emailVerified').notNull(),
					image: text('image'),
					createdAt: timestamp('createdAt').notNull(),
					updatedAt: timestamp('updatedAt').notNull()
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expiresAt').notNull(),
					token: text('token').notNull().unique(),
					createdAt: timestamp('createdAt').notNull(),
					updatedAt: timestamp('updatedAt').notNull(),
					ipAddress: text('ipAddress'),
					userAgent: text('userAgent'),
					userId: text('userId').notNull().references(() => user.id)
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('accountId').notNull(),
					providerId: text('providerId').notNull(),
					userId: text('userId').notNull().references(() => user.id),
					accessToken: text('accessToken'),
					refreshToken: text('refreshToken'),
					idToken: text('idToken'),
					accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
					refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
					scope: text('scope'),
					password: text('password'),
					createdAt: timestamp('createdAt').notNull(),
					updatedAt: timestamp('updatedAt').notNull()
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
					value: text('value').notNull(),
					expiresAt: timestamp('expiresAt').notNull(),
					createdAt: timestamp('createdAt'),
					updatedAt: timestamp('updatedAt')
				});

// ==========================================
// CMS TABLES definitions
// ==========================================

export const posts = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	content: text("content").notNull(),
	description: text("description"),
	image: text("image"), // Image URL or path
	category: text("category"),
	status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
	publishedAt: timestamp("published_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portfolios = pgTable("portfolios", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	category: text("category"),
	industry: text("industry"),
	image: text("image"),
	tech: text("tech"), // Comma-separated tech list, e.g. "React, Next.js, Tailwind"
	url: text("url"),
	status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leads = pgTable("leads", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	whatsapp: text("whatsapp").notNull(),
	projectType: text("project_type").notNull(),
	budget: text("budget"),
	description: text("description").notNull(),
	status: text("status", { enum: ["new", "contacted", "closed"] }).notNull().default("new"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const analyticsVisits = pgTable("analytics_visits", {
  id: uuid("id").primaryKey().defaultRandom(),
  pathname: text("pathname").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});