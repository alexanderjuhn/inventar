package main
 
import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
    viper "github.com/spf13/viper"
)
 
var (
    host     string
    port     int
    user     string
    password string
    dbname   string
    db *sql.DB
)
 
func main() {
    ReadConfig()
    InitDatabaseConnection()
    
     
    // close database
    //defer db.Close()
 
    // check db
    
 
    fmt.Println("Connected!")
}
 
func CheckError(err error) {
    if err != nil {
        panic(err)
    }
}

func ReadConfig(){
	viper.SetConfigName("config") // name of config file (without extension)
    viper.SetConfigType("yaml") // REQUIRED if the config file does not have the extension in the name
    viper.AddConfigPath("/etc/appname/")   // path to look for the config file in
    viper.AddConfigPath("$HOME/.appname")  // call multiple times to add many search paths
    viper.AddConfigPath(".")               // optionally look for config in the working directory
    viper.AddConfigPath("..")
    err := viper.ReadInConfig() // Find and read the config file
    if err != nil { // Handle errors reading the config file
	    panic(fmt.Errorf("fatal error config file: %w", err))
    }
    host = viper.GetString("database.hostname")
    port = viper.GetInt("database.port")
    user = viper.GetString("database.user")
    password = viper.GetString("database.password")
    dbname = viper.GetString("database.dbname")
    fmt.Println("Done reading config")
}

func InitDatabaseConnection(){
    fmt.Println(host)
    fmt.Println(port)
    fmt.Println(user)
    fmt.Println(password)
    fmt.Println(dbname)

    // connection string
    psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
         
    // open database
    db, err := sql.Open("postgres", psqlconn)
    CheckError(err)

    err = db.Ping()
    CheckError(err)
}