package main

import (
	"github.com/galeradan/auth-app/backend/database"
	"github.com/galeradan/auth-app/backend/routes"
	"github.com/galeradan/auth-app/backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// CHECKS if ENV exists
	utils.LoadEnv()

	// Connects to the database
	database.Connect()

	// Instantiate new fiber and setup index route
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}
