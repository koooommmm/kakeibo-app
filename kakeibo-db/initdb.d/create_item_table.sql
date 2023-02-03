CREATE TABLE item (
    id                    INTEGER AUTO_INCREMENT PRIMARY KEY,
    kind                  VARCHAR(256),
    date                  DATETIME NOT NULL,
    category              VARCHAR(256),
    name                  VARCHAR(256),
    price                 INTEGER NOT NULL,
    delete_flag           BOOLEAN NOT NULL DEFAULT FALSE,
    created_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);