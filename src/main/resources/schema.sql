DROP TABLE IF EXISTS filter;
CREATE TABLE filter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    criteria LONGTEXT,
    selection VARCHAR(255)
);