package databaseConnector

import (
	"database/sql"
    "fmt"
  _ "github.com/lib/pq"
    "time"
)

var(
	db *sql.DB
)

type item struct{
    id int 
	name string
    amount int
}

// Return all items with amount
func ReadInventar() []item{
	db = GetConnection()
    rows, err := db.Query(`SELECT "id", "amount", "name" FROM inventar.item`)
    CheckError(err)
 
    defer rows.Close()
    
    var itemList = make([]item, 0)
    for rows.Next() {
        var newItem item
        err = rows.Scan(&newItem.id, &newItem.amount, &newItem.name)
        CheckError(err)

        itemList = append(itemList, newItem)
    }
 
    CheckError(err)
    return itemList
}

// Update the amount of items
func UpdateInventar(itemList []item){
	for index, item := range itemList{
		fmt.Println(index,item.id,item.amount, item.name)
		db := GetConnection()
    	var e error
		if(item.id == 0){
			// Item seems not to be in the database
			// Insert it
			stmt := `insert into inventar.item("id", "amount", "name", "last_update") values(nextval(inventar.item_seq),$1,$2,$3)`
			_, e = db.Exec(stmt, item.amount, item.name, time.Now())
		} else {
			// Item is already in the database
			// Update it
			stmt := `update inventar.item set amount=$1, last_update=$3 where id=$2`
			_, e = db.Exec(stmt, item.amount+1, item.id, time.Now())
		}
		CheckError(e)
	}
}

// Return open connection
// If no connection is currently open then open a new connection
func GetConnection() *sql.DB {
	if (db == nil){
		ReadConfig()
	    return GetDatabaseConnection()
	} else { 
		return db
	}
}