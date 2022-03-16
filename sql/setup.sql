DROP TABLE IF EXISTS housewives; 

CREATE TABLE housewives (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name TEXT NOT NULL,
    season TEXT NOT NULL
); 

INSERT INTO
    housewives (name, season)
VALUES
    ('Lisa Vanderpump', 'Beverly Hills')