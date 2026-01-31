package main

import (
	"os"
	"time"

	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/config"
	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/handlers"
	"github.com/KOKUMUbooker/fortuneteller-ai/Backend/internal/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.Load()
	// fmt.Println("cfg : ", cfg)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // local default
	}

	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"https://fteller.netlify.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
		},
		ExposeHeaders: []string{
			"Content-Length",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Rate limiting
	// r.Use(middleware.RateLimiter())

	// Routes
	r.GET("/ping", handlers.PingHandler)
	r.POST("/api/price/recommend", handlers.PriceRecommendingHandler)

	// Start cleanup worker
	go middleware.CleanupClients()

	r.Run(":" + port)
}
