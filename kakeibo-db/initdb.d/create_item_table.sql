CREATE TABLE items (
    id                    INTEGER AUTO_INCREMENT PRIMARY KEY,
    kind                  VARCHAR(256),
    date                  DATE NOT NULL,
    category              VARCHAR(256),
    name                  VARCHAR(256),
    price                 INTEGER NOT NULL,
    delete_flag           BOOLEAN NOT NULL DEFAULT FALSE,
    created_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- テスト用初期データ
insert into items (kind, date, category, name, price) values ('income', '2023-02-03', '給与', '給与', 250000);
insert into items (kind, date, category, name, price) values ('expense', '2023-02-03', '食費', '焼肉', 6000);
insert into items (kind, date, category, name, price) values ('expense', '2023-02-03', '光熱費', '水道代', 3500);