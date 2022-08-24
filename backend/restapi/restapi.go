package main

import (
	"fmt"
	"net/http"

	dc "backend/databaseConnector"

	"github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()
    router.GET("/readInventar", getInventar)
    router.POST("/updateInventar", updateInventar)
    router.Run("localhost:8080")
}

func getInventar(c *gin.Context) {
    var itemList []dc.Item = dc.ReadInventar()

    c.IndentedJSON(http.StatusOK, itemList)
}

func updateInventar(c *gin.Context) {
    var updatedItem []dc.Item
    if err := c.BindJSON(&updatedItem); err != nil {
        fmt.Println(err)
        return
    }

    dc.UpdateInventar(updatedItem)
}