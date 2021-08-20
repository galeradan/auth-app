package main

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Initialize connection to database
	_, err := gorm.Open(mysql.Open("root:root@/auth_app_db"), &gorm.Config{})

	// Report database connection error
	if err != nil {
		panic("Could not connect to database")
	}

	// Instantiate new fiber and setup index route
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":8000")
}
