CREATE TABLE notifications
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT 
    , content MEDIUMTEXT
    , acknowledged BOOLEAN DEFAULT FALSE
    , date_added TIMESTAMP
    , user_id VARCHAR(255) NOT NULL
    , other_user_id VARCHAR(255)
    , list_id INT
    , FOREIGN KEY (user_id) REFERENCES users(id)
    , FOREIGN KEY (other_user_id) REFERENCES users(id)
    , FOREIGN KEY (list_id) REFERENCES lists(id)
    , PRIMARY KEY(id)
);