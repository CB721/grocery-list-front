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

CREATE PROCEDURE get_user_notifications(IN ID VARCHAR(255))
SELECT DISTINCT
notifications.id
, notifications.content
, notifications.acknowledged
, notifications.date_added
, notifications.list_id
, Main.id AS user_id
, Other.id AS other_user_id
, Other.first_name AS other_user_first_name
, Other.last_name AS other_user_last_name
FROM users Main, users Other
LEFT JOIN notifications ON (Other.id = notifications.other_user_id)
WHERE notifications.user_id = ID AND Main.id = ID AND Other.id <> ID
UNION 
SELECT DISTINCT
notifications.id
, notifications.content
, notifications.acknowledged
, notifications.date_added
, notifications.list_id
, users.id AS user_id
, notifications.other_user_id AS other_user_id
, null AS other_user_first_name
, null AS other_user_last_name
FROM users
LEFT JOIN notifications ON notifications.user_id = users.id
WHERE notifications.user_id = ID AND notifications.other_user_id IS NULL
GROUP BY notifications.id
ORDER BY date_added
LIMIT 10;
CALL get_user_notifications("5e4e16015cf44f8ed86f851e");