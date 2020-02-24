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

CREATE TABLE connections
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT
    , requestor_id VARCHAR(255) NOT NULL 
    , requested_id VARCHAR(255) NOT NULL 
    , date TIMESTAMP
    , pending BOOLEAN DEFAULT FALSE
    , accepted BOOLEAN DEFAULT FALSE
    , FOREIGN KEY (requestor_id) REFERENCES users(id)
    , FOREIGN KEY (requested_id) REFERENCES users(id)
    PRIMARY KEY(id)
);