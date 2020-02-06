CREATE TABLE list_items
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT 
    , date_added TIMESTAMP
    , date_purchased TIMESTAMP
    , list_id INT NOT NULL
    , name VARCHAR(255) NOT NULL
    , purchased BOOLEAN DEFAULT FALSE
    , store_id VARCHAR(255) NOT NULL
    , FOREIGN KEY (list_id) REFERENCES lists(id)
    , FOREIGN KEY (store_id) REFERENCES stores(id)
    , PRIMARY KEY(id)
);