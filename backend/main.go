package main
import (
    dq "backend/databaseConnector"
)
func main() {
    dq.UpdateInventar(dq.ReadInventar())
}