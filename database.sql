-- Drop table if needed for testing
DROP TABLE IF EXISTS TodoTasks;

-- Create "Tasks" table
CREATE TABLE TodoTasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(300) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sample data for "Tasks"
INSERT INTO TodoTasks (description) VALUES ('Grind grains');
INSERT INTO TodoTasks (description) VALUES ('Preheat mash tun w/ boiling water');
INSERT INTO TodoTasks (description) VALUES ('Heat mash water to 155 °F');
INSERT INTO TodoTasks (description) VALUES ('Dough in');
INSERT INTO TodoTasks (description) VALUES ('Adjust water chemistry (if needed)');
INSERT INTO TodoTasks (description) VALUES ('Wait ... >= 1 & 1/2 hrs');
INSERT INTO TodoTasks (description) VALUES ('Heat sparge water');
INSERT INTO TodoTasks (description) VALUES ('Begin the vorlaüf (sp?) (i.e. water recirculation process)');

UPDATE TodoTasks SET completed = TRUE WHERE id = 4;

-- Insert a new Task
INSERT INTO "Tasks"
("description") VALUES ($1);

-- List all Tasks
SELECT id, description, completed FROM TodoTasks
ORDER BY completed, created_timestamp ASC
LIMIT 100;

-- Set a Task to complete
UPDATE TodoTasks
SET completed = TRUE
WHERE id = $1;

-- Delete a Task
DELETE FROM TodoTasks
WHERE id = $1;
