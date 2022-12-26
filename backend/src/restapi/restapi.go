package restapi

import (
	"fmt"
	"net/http"

	dc "backend/databaseConnector"

	"github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func StartServer() {
    dc.ReadConfig()
    router := gin.Default()

    // same as
    // config := cors.DefaultConfig()
    // config.AllowAllOrigins = true
    // router.Use(cors.New(config))
    router.Use(cors.Default())


    router.GET("/inventar_backend/readInventar", getInventar)
    router.POST("/inventar_backend/updateInventar", updateInventar)
    router.GET("/inventar_backend/livenessProbe", livenessProbe)
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