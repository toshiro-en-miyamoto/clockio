CREATE SCHEMA IF NOT EXISTS time_record;

DROP TABLE IF EXISTS time_record.clock_types;
CREATE TABLE time_record.clock_types (
    clock_type_value  integer PRIMARY KEY,
    clock_type_name   text NOT NULL UNIQUE
);
INSERT INTO time_record.clock_types
    (clock_type_value, clock_type_name)
    VALUES
    (0, 'CLOCK_OUT'),
    (1, 'CLOCK_IN');

DROP TABLE IF EXISTS time_record.clocks;
CREATE TABLE time_record.clocks (
    emp_no_for  text NOT NULL,
    emp_no_by   text,
    clock_date  date NOT NULL, 
    clock_type  integer NOT NULL REFERENCES time_record.clock_types (clock_type_value),
    clocked_at  timestamp with time zone GENERATED ALWAYS (CURRENT_TIMESTAMP) STORED
);
INSERT INTO time_record.clocks VALUES ('E002', NULL, '2020-08-06', 1);
INSERT INTO time_record.clocks VALUES ('E003', NULL, '2020-08-09', 1);
INSERT INTO time_record.clocks VALUES ('E004', 'E001', '2020-08-15', 1);
INSERT INTO time_record.clocks VALUES ('E002', NULL, '2020-08-06', 0);
INSERT INTO time_record.clocks VALUES ('E003', 'E001', '2020-08-09', 0);
INSERT INTO time_record.clocks VALUES ('E004', NULL, '2020-08-15', 0);
