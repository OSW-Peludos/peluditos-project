CREATE DATABASE IF NOT EXISTS dbpeluditos;

use dbpeluditos

CREATE TABLE IF NOT EXISTS Peluditos (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    race VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    adopta_ref VARCHAR(255),
    age VARCHAR(255),
    description VARCHAR(2000),
    weight VARCHAR(255),
    hair_color VARCHAR(255),
    hair_type VARCHAR(255),
    size VARCHAR(255),
    picture VARCHAR(400),
    reg_date TIMESTAMP,
    kind VARCHAR(255),
    PRIMARY KEY (ID)
);