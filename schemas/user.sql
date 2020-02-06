CREATE TABLE users
(
    id INT NOT NULL UNIQUE
    , first_name VARCHAR(255) NOT NULL 
    , last_name VARCHAR(255) NOT NULL
    , email VARCHAR(255) NOT NULL
    , user_password VARCHAR(255) NOT NULL
    , last_visit TIMESTAMP
    , joined TIMESTAMP
    PRIMARY KEY(id)
);