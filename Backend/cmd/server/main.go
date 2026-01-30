package main

import (
	"fmt"

	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/config"
	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	fmt.Println("cfg : ", cfg)

	// Create a Gin router with default middleware (logger and recovery)
	r := gin.Default()

	// Define a simple GET endpoint
	r.GET("/ping", handlers.PingHandler)
	r.POST("/api/price/recommend", handlers.PriceRecommendingHandler)

	// Start server on port 8080 (default)
	// Server will listen on 0.0.0.0:8080 (localhost:8080 on Windows)
	r.Run()
}
