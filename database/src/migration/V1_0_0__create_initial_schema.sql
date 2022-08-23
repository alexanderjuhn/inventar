CREATE TABLE inventar.item (
	id int4 NOT NULL,
	amount int4,
	last_update timestamp,
	CONSTRAINT item_id PRIMARY KEY (id)
);

CREATE TABLE code_item_mapping (
	item_id int4 NOT NULL,
	code varchar(32) NOT NULL UNIQUE
);

ALTER TABLE inventar.code_item_mapping ADD CONSTRAINT item_fk FOREIGN KEY (item_id) REFERENCES inventar.item(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

