CREATE TABLE IF NOT EXISTS `temp_ledger_transaction` (
  id  BINARY(36) NOT NULL PRIMARY KEY,
  ledger_id BINARY(36) REFERENCES temp_ledger(id)
  user varchar(255) NOT NULL,
  item varchar(255) NOT NULL,
  cost INT NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;