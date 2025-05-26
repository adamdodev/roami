ALTER TABLE `countries` RENAME COLUMN "iso" TO "cca2";--> statement-breakpoint
DROP INDEX `countries_iso_unique`;--> statement-breakpoint
ALTER TABLE `countries` ADD `flag` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `countries_cca2_unique` ON `countries` (`cca2`);