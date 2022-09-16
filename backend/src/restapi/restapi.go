package restapi

import (
	"fmt"
	"net/http"

	dc "backend/databaseConnector"

	"github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func StartServer() {
    router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins: []string{"*"},
        AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
        AllowHeaders: []string{"*"},
    }))


    router.GET("/readInventar", getInventar)
    router.POST("/updateInventar", updateInventar)
    router.GET("/livenessProbe", livenessProbe)
    router.Run(":8080")
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

func livenessProbe(c *gin.Context){
    c.IndentedJSON(200,"Ok")
}