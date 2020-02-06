CREATE TABLE user_stores
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT
    , store_id VARCHAR(255) NOT NULL
    , user_id VARCHAR(255) NOT NULL 
    , FOREIGN KEY (store_id) REFERENCES stores(id)
    , FOREIGN KEY (user_id) REFERENCES users(id)
    , PRIMARY KEY(id)
);