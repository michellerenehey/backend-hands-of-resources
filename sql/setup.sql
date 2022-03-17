DROP TABLE IF EXISTS housewives; 
DROP TABLE IF EXISTS friends; 
DROP TABLE IF EXISTS flours; 

CREATE TABLE housewives (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name TEXT NOT NULL,
    season TEXT NOT NULL
); 

CREATE TABLE friends (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name TEXT NOT NULL,
    city TEXT NOT NULL, 
    favorite_animal TEXT NOT NULL
); 

CREATE TABLE flours (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    type TEXT NOT NULL,
    protein TEXT NOT NULL 
); 

INSERT INTO
    housewives (name, season)
VALUES
    ('Lisa Vanderpump', 'Beverly Hills');

INSERT INTO
    friends (name, city, favorite_animal)
VALUES
    ('forest', 'portland', 'fox'),
    ('ian', 'reno', 'cat'),
    ('adria', 'portland', 'deer');

INSERT INTO
    flours (type, protein)
VALUES
    ('bread', '14%');