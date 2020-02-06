CREATE TABLE lists
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT 
    , completed BOOLEAN DEFAULT FALSE
    , date_added TIMESTAMP
    , user_id VARCHAR(255) NOT NULL 
    , FOREIGN KEY (user_id) REFERENCES users(id)
    , PRIMARY KEY(id)
);