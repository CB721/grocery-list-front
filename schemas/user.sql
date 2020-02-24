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
    , date_added TIMESTAMP
    , pending BOOLEAN DEFAULT FALSE
    , accepted BOOLEAN DEFAULT FALSE
    , FOREIGN KEY (requestor_id) REFERENCES users(id)
    , FOREIGN KEY (requested_id) REFERENCES users(id)
    , PRIMARY KEY(id)
);

-- first select for all connection requests sent
SELECT
connections.id
, connections.date_added
, connections.pending
, connections.accepted
, connections.requestor_id
, users.first_name AS requestor_first_name
, users.last_name AS requestor_last_name
, users.email AS requestor_email
, connections.requested_id
, null AS requested_first_name
, null AS requested_last_name
, null AS requested_email
FROM users
LEFT JOIN connections ON users.id = connections.requested_id
WHERE connections.requestor_id = ID
UNION
-- second select for all connection requests received
SELECT
connections.id
, connections.date_added
, connections.pending
, connections.accepted
, connections.requestor_id
, null AS requestor_first_name
, null AS requestor_last_name
, null AS requestor_email
, connections.requested_id
, users.first_name AS requested_first_name
, users.last_name  AS requested_last_name
, users.email AS requested_email
FROM users
LEFT JOIN connections ON users.id = connections.requestor_id
WHERE connections.requested_id = ID;