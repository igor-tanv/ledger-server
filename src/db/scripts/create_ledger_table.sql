CREATE TABLE IF NOT EXISTS `ledger` (
  id  BINARY(36) NOT NULL PRIMARY KEY,
  user varchar(255) NOT NULL,
  item varchar(255) NOT NULL,
  cost INT NOT NULL,
  purchase_date INT NOT NULL,
  cleared BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;