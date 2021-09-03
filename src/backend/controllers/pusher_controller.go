package controllers

import (
	"tarachat/backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/pusher/pusher-http-go"
)

func Pusher(c *fiber.Ctx) error {
	pusherClient := pusher.Client{
		AppID:   utils.GetEnv("PUSHER_APP_ID"),
		Key:     utils.GetEnv("PUSHER_KEY"),
		Secret:  utils.GetEnv("PUSHER_SECRET"),
		Cluster: utils.GetEnv("PUSHER_CLUSTER"),
		Secure:  true,
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	pusherClient.Trigger("chat", "message", data)

	return c.JSON([]string{})
}
