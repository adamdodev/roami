// TODO Consider prepopulating some of these tables

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

// Items table
export const itemsTable = sqliteTable("items", {
  id: integer().primaryKey(),
  name: text().notNull(),
  description: text(),
});

// Countries table
export const countriesTable = sqliteTable("countries", {
  id: integer().primaryKey(),
  cca2: text().notNull().unique(),
  name: text().notNull(),
  flag: text().notNull(),
});

// Continents table
export const continentsTable = sqliteTable("continents", {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
});

// Locations table
export const locationsTable = sqliteTable("locations", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

// Tags table
export const tagsTable = sqliteTable("tags", {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
});

// Activities table
export const activitiesTable = sqliteTable("activities", {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
});

// Many-to-Many Relationships
export const itemActivitiesTable = sqliteTable("item_activities", {
  itemId: text().notNull().references(() => itemsTable.id), // Use GUIDs
  activityId: text().notNull().references(() => activitiesTable.id), // Use GUIDs
});

export const itemCountriesTable = sqliteTable("item_countries", {
  itemId: text().notNull().references(() => itemsTable.id), // Use GUIDs
  countryId: text().notNull().references(() => countriesTable.id), // Use GUIDs
});

export const itemContinentsTable = sqliteTable("item_continents", {
  itemId: text().notNull().references(() => itemsTable.id), // Use GUIDs
  continentId: text().notNull().references(() => continentsTable.id), // Use GUIDs
});

export const itemLocationsTable = sqliteTable("item_locations", {
  itemId: text().notNull().references(() => itemsTable.id), // Use GUIDs
  locationId: text().notNull().references(() => locationsTable.id), // Use GUIDs
});

export const itemTagsTable = sqliteTable("item_tags", {
  itemId: text().notNull().references(() => itemsTable.id), // Use GUIDs
  tagId: text().notNull().references(() => tagsTable.id), // Use GUIDs
});