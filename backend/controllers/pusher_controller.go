package controllers

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/pusher/pusher-http-go"
)

func Pusher(c *fiber.Ctx) error {
	envs, err := godotenv.Read(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	pusherClient := pusher.Client{
		AppID:   envs["PUSHER_APP_ID"],
		Key:     envs["PUSHER_KEY"],
		Secret:  envs["PUSHER_SECRET"],
		Cluster: envs["PUSHER_CLUSTER"],
		Secure:  true,
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	pusherClient.Trigger("chat", "message", data)

	return c.JSON([]string{})
}
