CREATE TABLE IF NOT EXISTS `ledger` (
  id  BINARY(36) NOT NULL PRIMARY KEY,
  item varchar(255) NOT NULL,
  purchase_date int NOT NULL,
  cleared BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;