package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PriceRecommendingHandler(c *gin.Context) {
	// Return JSON response
	c.JSON(http.StatusOK, gin.H{
		"message": "Endpoint for price recommending handler",
	})
}
