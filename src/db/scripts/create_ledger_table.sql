CREATE TABLE IF NOT EXISTS `ledger` (
  id  BINARY(36) NOT NULL PRIMARY KEY,
  user varchar(255) NOT NULL,
  item varchar(255) NOT NULL,
  cost INT NOT NULL,
  purchase_date BIGINT NOT NULL,
  cleared TINYINT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;