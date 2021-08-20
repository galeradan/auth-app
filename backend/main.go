package main

import (
	"github.com/galeradan/auth-app/backend/database"
	"github.com/galeradan/auth-app/backend/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()

	// Instantiate new fiber and setup index route
	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8000")
}
