DROP INDEX `countries_name_unique`;--> statement-breakpoint
ALTER TABLE `countries` ADD `iso` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `countries_iso_unique` ON `countries` (`iso`);