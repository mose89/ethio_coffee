import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`home_origin_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`coffees_hero_title\` text;`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`coffees_hero_intro\` text;`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`coffees_hero_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`trips_hero_title\` text;`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`trips_hero_intro\` text;`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`trips_hero_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`page_content\` ADD \`trips_detail_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`page_content_home_home_origin_image_idx\` ON \`page_content\` (\`home_origin_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_coffees_coffees_hero_image_idx\` ON \`page_content\` (\`coffees_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_trips_trips_hero_image_idx\` ON \`page_content\` (\`trips_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_trips_trips_detail_image_idx\` ON \`page_content\` (\`trips_detail_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_page_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`home_hero_title\` text,
  	\`home_hero_intro\` text,
  	\`home_hero_image_id\` integer,
  	\`home_intro_title\` text,
  	\`home_intro_text\` text,
  	\`home_intro_image_id\` integer,
  	\`green_hero_title\` text,
  	\`green_hero_intro\` text,
  	\`green_hero_image_id\` integer,
  	\`roasted_hero_title\` text,
  	\`roasted_hero_intro\` text,
  	\`roasted_hero_image_id\` integer,
  	\`roasted_detail_image_id\` integer,
  	\`about_hero_title\` text,
  	\`about_hero_intro\` text,
  	\`about_hero_image_id\` integer,
  	\`about_story\` text,
  	\`about_founder_portrait_id\` integer,
  	\`process_samples_image_id\` integer,
  	\`process_shipping_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`home_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`home_intro_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`green_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`roasted_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`roasted_detail_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_founder_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`process_samples_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`process_shipping_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_page_content\`("id", "home_hero_title", "home_hero_intro", "home_hero_image_id", "home_intro_title", "home_intro_text", "home_intro_image_id", "green_hero_title", "green_hero_intro", "green_hero_image_id", "roasted_hero_title", "roasted_hero_intro", "roasted_hero_image_id", "roasted_detail_image_id", "about_hero_title", "about_hero_intro", "about_hero_image_id", "about_story", "about_founder_portrait_id", "process_samples_image_id", "process_shipping_image_id", "updated_at", "created_at") SELECT "id", "home_hero_title", "home_hero_intro", "home_hero_image_id", "home_intro_title", "home_intro_text", "home_intro_image_id", "green_hero_title", "green_hero_intro", "green_hero_image_id", "roasted_hero_title", "roasted_hero_intro", "roasted_hero_image_id", "roasted_detail_image_id", "about_hero_title", "about_hero_intro", "about_hero_image_id", "about_story", "about_founder_portrait_id", "process_samples_image_id", "process_shipping_image_id", "updated_at", "created_at" FROM \`page_content\`;`)
  await db.run(sql`DROP TABLE \`page_content\`;`)
  await db.run(sql`ALTER TABLE \`__new_page_content\` RENAME TO \`page_content\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`page_content_home_home_hero_image_idx\` ON \`page_content\` (\`home_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_home_home_intro_image_idx\` ON \`page_content\` (\`home_intro_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_green_green_hero_image_idx\` ON \`page_content\` (\`green_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_roasted_roasted_hero_image_idx\` ON \`page_content\` (\`roasted_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_roasted_roasted_detail_image_idx\` ON \`page_content\` (\`roasted_detail_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_about_about_hero_image_idx\` ON \`page_content\` (\`about_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_about_about_founder_portrait_idx\` ON \`page_content\` (\`about_founder_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_process_process_samples_image_idx\` ON \`page_content\` (\`process_samples_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_content_process_process_shipping_image_idx\` ON \`page_content\` (\`process_shipping_image_id\`);`)
}
