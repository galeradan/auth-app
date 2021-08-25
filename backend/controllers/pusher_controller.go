package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pusher/pusher-http-go"
)

func Pusher(c *fiber.Ctx) error {
	pusherClient := pusher.Client{
		AppID:   "1255867",
		Key:     "1b2c8b2a564bfd6991f3",
		Secret:  "3b8fadde52060dc7a4a9",
		Cluster: "ap1",
		Secure:  true,
	}

	var data map[string]string
	pusherClient.Trigger("chat", "message", data)

	return c.JSON([]string{})
}
