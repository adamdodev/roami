CREATE TABLE `activities` (
	`id` text,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activities_name_unique` ON `activities` (`name`);--> statement-breakpoint
CREATE TABLE `item_activities` (
	`itemId` text NOT NULL,
	`activityId` text NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_continents` (
	`id` text,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_continents`("id", "name") SELECT "id", "name" FROM `continents`;--> statement-breakpoint
DROP TABLE `continents`;--> statement-breakpoint
ALTER TABLE `__new_continents` RENAME TO `continents`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `continents_name_unique` ON `continents` (`name`);--> statement-breakpoint
CREATE TABLE `__new_countries` (
	`id` text,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_countries`("id", "name") SELECT "id", "name" FROM `countries`;--> statement-breakpoint
DROP TABLE `countries`;--> statement-breakpoint
ALTER TABLE `__new_countries` RENAME TO `countries`;--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE TABLE `__new_item_continents` (
	`itemId` text NOT NULL,
	`continentId` text NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`continentId`) REFERENCES `continents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_continents`("itemId", "continentId") SELECT "itemId", "continentId" FROM `item_continents`;--> statement-breakpoint
DROP TABLE `item_continents`;--> statement-breakpoint
ALTER TABLE `__new_item_continents` RENAME TO `item_continents`;--> statement-breakpoint
CREATE TABLE `__new_item_countries` (
	`itemId` text NOT NULL,
	`countryId` text NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_countries`("itemId", "countryId") SELECT "itemId", "countryId" FROM `item_countries`;--> statement-breakpoint
DROP TABLE `item_countries`;--> statement-breakpoint
ALTER TABLE `__new_item_countries` RENAME TO `item_countries`;--> statement-breakpoint
CREATE TABLE `__new_item_locations` (
	`itemId` text NOT NULL,
	`locationId` text NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_locations`("itemId", "locationId") SELECT "itemId", "locationId" FROM `item_locations`;--> statement-breakpoint
DROP TABLE `item_locations`;--> statement-breakpoint
ALTER TABLE `__new_item_locations` RENAME TO `item_locations`;--> statement-breakpoint
CREATE TABLE `__new_item_tags` (
	`itemId` text NOT NULL,
	`tagId` text NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_item_tags`("itemId", "tagId") SELECT "itemId", "tagId" FROM `item_tags`;--> statement-breakpoint
DROP TABLE `item_tags`;--> statement-breakpoint
ALTER TABLE `__new_item_tags` RENAME TO `item_tags`;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` text,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "name", "description") SELECT "id", "name", "description" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
CREATE TABLE `__new_locations` (
	`id` text,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_locations`("id", "name") SELECT "id", "name" FROM `locations`;--> statement-breakpoint
DROP TABLE `locations`;--> statement-breakpoint
ALTER TABLE `__new_locations` RENAME TO `locations`;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` text,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`("id", "name") SELECT "id", "name" FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);