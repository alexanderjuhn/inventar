package databaseConnector

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

var(
	db *sql.DB
)

type Item struct{
    Id int 
	Name string
    Amount int
	Updated bool
}

// Return all items with amount
func ReadInventar() []Item{
	db = GetConnection()
    rows, err := db.Query(`SELECT "id", "amount", "name" FROM inventar.item`)
    CheckError(err)
 
    defer rows.Close()
    
    var itemList = make([]Item, 0)
    for rows.Next() {
        var newItem Item
        err = rows.Scan(&newItem.Id, &newItem.Amount, &newItem.Name)
        CheckError(err)
		newItem.Updated = false

        itemList = append(itemList, newItem)
    }
 
    CheckError(err)
    return itemList
}

// Update the amount of items
func UpdateInventar(itemList []Item){
	for _, item := range itemList{

		// skip items that were not updated
		if (item.Updated==false){
			continue
		}
		fmt.Println("Update Item ",item.Id)
		db := GetConnection()
    	var e error
		if(item.Id == 0){
			// Item seems not to be in the database
			// Insert it
			stmt := `insert into inventar.item("id", "amount", "name", "last_update") values(nextval(inventar.item_seq),$1,$2,$3)`
			_, e = db.Exec(stmt, item.Amount, item.Name, time.Now())
		} else {
			// Item is already in the database
			// Update it
			stmt := `update inventar.item set amount=$1, last_update=$3 where id=$2`
			_, e = db.Exec(stmt, item.Amount, item.Id, time.Now())
		}
		CheckError(e)
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