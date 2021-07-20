CREATE TABLE IF NOT EXISTS `short_ledger_transaction` (
  id  BINARY(36) NOT NULL PRIMARY KEY,
  ledger_id BINARY(36) REFERENCES short_ledger(id),
  user varchar(255) NOT NULL,
  item varchar(255) NOT NULL,
  cost INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;