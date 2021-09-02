package main

import (
	"github.com/galeradan/auth-app/src/backend/database"
	"github.com/galeradan/auth-app/src/backend/routes"
	"github.com/galeradan/auth-app/src/backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Connects to the database
	database.Connect()

	// Instantiate new fiber and setup index route
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":" + utils.GetEnv("PORT"))
}
