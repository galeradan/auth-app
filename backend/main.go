package main

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	_, err := gorm.Open(mysql.Open("root:root@/auth_app_db"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to database")
	}

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":8000")
}
