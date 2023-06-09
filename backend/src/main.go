package main

import (
    "net/http"
    muxtrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
    restapi "backend/restapi"
)


func main() {
    tracer.Start()
    defer tracer.Stop()

    // Create a traced mux router.
    mux := muxtrace.NewRouter()
    // Continue using the router as you normally would.
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello World!"))
    })
    http.ListenAndServe(":8080", mux)

    restapi.StartServer()
}