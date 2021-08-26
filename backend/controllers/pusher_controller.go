package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pusher/pusher-http-go"
)

func Pusher(c *fiber.Ctx) error {
	pusherClient := pusher.Client{
		AppID:   "1256533",
		Key:     "2f01d024dfdccd763f51",
		Secret:  "5121444064adf71a1f36",
		Cluster: "ap1",
		Secure:  true,
	}

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	pusherClient.Trigger("chat", "message", data)

	return c.JSON([]string{})
}
