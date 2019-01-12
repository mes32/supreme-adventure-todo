-- Create "Tasks" table
CREATE TABLE "Tasks" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR(300) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Insert a new Task
INSERT INTO "Tasks"
("description") VALUES ($1);

-- List all Tasks
SELECT "id", "description", "completed" FROM "Tasks"
LIMIT 100;

-- Set a Task to complete
UPDATE "Tasks"
SET "completed" = TRUE
WHERE "id" = $1;

-- Delete a Task
DELETE FROM "Tasks"
WHERE "id" = $1;

-- Sample data
INSERT INTO "Tasks"
    ("description")
VALUES
    ('Grind grains'),
    ('Preheat mash tun w/ boiling water'),
    ('Heat mash water to 155 °F'),
    ('Dough in'),
    ('Adjust water chemistry (if needed)'),
    ('Wait for an hour and a half'),
    ('Heat sparge water'),
    ('Begin the vorlaüf (sp?) recirculation process');