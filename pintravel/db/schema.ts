// TODO Consider prepopulating some of these tables

import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Items table
export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
});

// Countries table
export const countriesTable = sqliteTable("countries", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

// Continents table
export const continentsTable = sqliteTable("continents", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

// Locations table
export const locationsTable = sqliteTable("locations", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

// Tags table
export const tagsTable = sqliteTable("tags", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});

// Many-to-Many Relationships
export const itemCountriesTable = sqliteTable("item_countries", {
  itemId: int().notNull().references(() => itemsTable.id),
  countryId: int().notNull().references(() => countriesTable.id),
});

export const itemContinentsTable = sqliteTable("item_continents", {
  itemId: int().notNull().references(() => itemsTable.id),
  continentId: int().notNull().references(() => continentsTable.id),
});

export const itemLocationsTable = sqliteTable("item_locations", {
  itemId: int().notNull().references(() => itemsTable.id),
  locationId: int().notNull().references(() => locationsTable.id),
});

export const itemTagsTable = sqliteTable("item_tags", {
  itemId: int().notNull().references(() => itemsTable.id),
  tagId: int().notNull().references(() => tagsTable.id),
});