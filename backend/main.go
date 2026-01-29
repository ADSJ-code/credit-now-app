package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    // Porta do servidor (padrão 8080)
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    // Rota de teste para o Jules ver que a API respira
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "LMS API is running on Golang!")
    })

    // Rota de Healthcheck (importante para Docker)
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })

    fmt.Printf("Server starting on port %s...\n", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatal(err)
    }
}