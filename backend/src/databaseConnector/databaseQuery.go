package databaseConnector

import (
	"database/sql"
	"fmt"
	"time"
	"context"
	_ "github.com/lib/pq"
	"log"
)

var(
	db *sql.DB
)

type Item struct{
    Id int 
	Name string
    Amount int
	Updated bool
	Last_Update string
}

type ItemHistory struct{
	Id int
	Item_Id int
	AmountChange int
	Date_Change string
}

const(
	layoutTime = "02.01.2006"
)

// Return all items with amount
func ReadInventar() []Item{
	db = GetConnection()
    rows, err := db.Query(`SELECT "id", "amount", "name", "last_update" FROM inventar.item order by name`)
    CheckError(err)
 
    defer rows.Close()
    
    var itemList = make([]Item, 0)
    for rows.Next() {
        var newItem Item
        var timestamp time.Time
		err = rows.Scan(&newItem.Id, &newItem.Amount, &newItem.Name, &timestamp)

        CheckError(err)
		newItem.Updated = false
		newItem.Last_Update= timestamp.Format(layoutTime)
        itemList = append(itemList, newItem)
    }
 
    CheckError(err)
    return itemList
}


func GetItemHistory(itemId string) []ItemHistory{
	db = GetConnection()

	stmt := `SELECT "id", "item_id", "amount_change", "date_change" FROM inventar.item_history where item_id=$1 order by id desc`
	rows, err := db.Query(stmt, itemId)
	CheckError(err)

    defer rows.Close()
    
    var itemList = make([]ItemHistory, 0)
    for rows.Next() {
        var newItemHistory ItemHistory
        var timestamp time.Time
		err = rows.Scan(&newItemHistory.Id, &newItemHistory.Item_Id, &newItemHistory.AmountChange, &timestamp)

        CheckError(err)
		newItemHistory.Date_Change= timestamp.Format(layoutTime)
        itemList = append(itemList, newItemHistory)
    }
 
    CheckError(err)
    return itemList
}

// Update the amount of items
func UpdateInventar(itemList []Item){
	db := GetConnection()
	ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	for _, item := range itemList{

		// skip items that were not updated
		if (item.Updated==false){
			continue
		}
		fmt.Println("Update Item ",item.Id," : ", item.Name)
		if(item.Id == 0){
			// Item seems not to be in the database
			// Insert it
			stmt := "insert into inventar.item(id, amount, name, last_update) values(nextval('inventar.item_seq'),$1,$2,$3)"
			_, e := tx.Exec(stmt, item.Amount, item.Name, time.Now())
			CheckInsertError(e,tx)
		} else {
			// Item is already in the database
			// Update it and also log the amount change
			stmt := `insert into inventar.item_history (id, item_id, amount_change, date_change)
					 select nextval('inventar.item_history_seq'),$2,$1-amount,$3 from inventar.item where id=$2`
			_, e := tx.Exec(stmt, item.Amount, item.Id, time.Now())
			CheckInsertError(e,tx)
			stmt2 := `update inventar.item set amount=$1, last_update=$3 where id=$2`
			_, e = tx.Exec(stmt2, item.Amount, item.Id, time.Now())
			CheckInsertError(e,tx)
		}
	}
	e:=tx.Commit()
	CheckError(e)
}

func CheckInsertError(err error, tx *sql.Tx) {
    if err != nil {
		tx.Rollback()
        panic(err)
    }
}

// Return open connection
// If no connection is currently open then open a new connection
func GetConnection() *sql.DB {
	if (db == nil){
		ReadConfig()
		db = GetDatabaseConnection()
	    return db
	} else { 
		return db
	}
}