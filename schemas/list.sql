CREATE TABLE lists
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT 
    , completed BOOLEAN DEFAULT FALSE
    , date_added TIMESTAMP
    , user_id VARCHAR(255) NOT NULL 
    , FOREIGN KEY (user_id) REFERENCES users(id)
    , PRIMARY KEY(id)
);

CREATE PROCEDURE get_sent_lists(IN user_id VARCHAR(255), other_user_id VARCHAR(255))
SELECT 
notifications.user_id
, notifications.other_user_id
, notifications.list_id
, lists.list_name
FROM notifications
LEFT JOIN lists ON notifications.list_id = lists.id
-- user id will the id of the current user, other user id is the id of who sent the list
WHERE notifications.user_id = user_id AND notifications.other_user_id = other_user_id AND notifications.list_id IS NOT NULL
ORDER BY notifications.date_added;