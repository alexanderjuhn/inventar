package restapi

import (
	dc "backend/databaseConnector"
	"fmt"
	"net/http"
	"strings"

	gintrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func StartServer() {
	// tracer stuff
	tracer.Start(tracer.WithAnalytics(true))
	defer tracer.Stop()

	dc.ReadConfig()
	router := gin.Default()

	router.Use(gintrace.Middleware("inventar-backend"))

	// CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Item-Id", "*"}
	router.Use(cors.New(config))

	router.GET("/inventar_backend/readInventar", getInventar)
	router.POST("/inventar_backend/updateInventar", updateInventar)
	router.GET("/inventar_backend/livenessProbe", livenessProbe)
	router.GET("/inventar_backend/getItemHistory", getItemHistory)
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

func getItemHistory(c *gin.Context) {
	itemId := c.Request.URL.Query()["itemId"]
	//itemId := c.Request.Header["Item-Id"]
	itemHistory := dc.GetItemHistory(strings.Join(itemId, ""))

	c.IndentedJSON(http.StatusOK, itemHistory)
}

func livenessProbe(c *gin.Context) {
	c.IndentedJSON(200, "Ok")
}
