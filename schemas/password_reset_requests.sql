CREATE TABLE password_reset_requests
(
    id INT NOT NULL UNIQUE AUTO_INCREMENT
    , user_id VARCHAR(255) NOT NULL
    , date_requested TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    , temp_password VARCHAR(255) NOT NULL
    , updated BOOLEAN DEFAULT FALSE
    , CONSTRAINT pass_reset_con_user_id
		FOREIGN KEY (user_id)
		REFERENCES users (id)
		ON DELETE CASCADE
    , PRIMARY KEY(id)
);

CREATE PROCEDURE check_pass_reset_requests(IN user_id VARCHAR(255))
SELECT
password_reset_requests.id
, TIMEDIFF(NOW(), password_reset_requests.date_requested) AS time_difference
FROM password_reset_requests
WHERE user_id = user_id AND updated = FALSE AND TIMEDIFF(NOW(), password_reset_requests.date_requested) < "01:00:00";