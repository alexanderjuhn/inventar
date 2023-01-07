CREATE TABLE inventar.item_history (
	id int4 NULL,
	item_id int4 NOT NULL,
	amount_change int4 NOT NULL,
	date_change timestamp NOT NULL,
	CONSTRAINT item_history_item_id_fk FOREIGN KEY (item_id) REFERENCES inventar.item(id)
);


CREATE SEQUENCE inventar.item_history_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;