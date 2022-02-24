DROP TABLE IF EXISTS 'User';
CREATE TABLE 'User' (
    'id' int NOT NULL AUTO_INCREMENT,
    'username' varchar(255) NOT NULL,
    'password' varchar(255) NOT NULL,
    'email' varchar(255) NOT NULL,
    'phone' varchar(255) NOT NULL,
    'createdAt' datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    'updatedAt' datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    'deletedAt' datetime(6) NULL,
    UNIQUE (username),
    PRIMARY KEY (id)
) ENGINE = InnoDB