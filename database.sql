-- Drop table if needed
DROP TABLE "Tasks";

-- Create "Tasks" table
CREATE TABLE "Tasks" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR(300) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
    "insert_timestamp" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sample data for "Tasks"
INSERT INTO "Tasks" (description) VALUES ('Grind grains');
INSERT INTO "Tasks" (description) VALUES ('Preheat mash tun w/ boiling water');
INSERT INTO "Tasks" (description) VALUES ('Heat mash water to 155 °F');
INSERT INTO "Tasks" (description) VALUES ('Dough in');
INSERT INTO "Tasks" (description) VALUES ('Adjust water chemistry (if needed)');
INSERT INTO "Tasks" (description) VALUES ('Wait ... >= 1 & 1/2 hrs');
INSERT INTO "Tasks" (description) VALUES ('Heat sparge water');
INSERT INTO "Tasks" (description) VALUES ('Begin the vorlaüf (sp?) (i.e. water recirculation process)');

UPDATE "Tasks" SET completed = TRUE WHERE id = 4;

-- Insert a new Task
INSERT INTO "Tasks"
("description") VALUES ($1);

-- List all Tasks
SELECT id, description, completed FROM "Tasks"
ORDER BY completed, insert_timestamp ASC
LIMIT 100;

-- Set a Task to complete
UPDATE "Tasks"
SET "completed" = TRUE
WHERE "id" = $1;

-- Delete a Task
DELETE FROM "Tasks"
WHERE "id" = $1;
