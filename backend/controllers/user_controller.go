package controllers

import (
	"github.com/galeradan/auth-app/backend/database"
	"github.com/galeradan/auth-app/backend/models"
	"github.com/galeradan/auth-app/backend/utils"
	"github.com/gofiber/fiber/v2"
)

func UpdateUser(c *fiber.Ctx) error {
	// Get's the cookie
	cookie := c.Cookies("jwt")

	issuer, err := utils.GetClaimsIssuer(cookie)

	// Checks if the parsed cookie is authorized
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	// Gets the User's record and return it as response
	var user models.User
	database.DB.Where("id = ?", issuer).First(&user)

	return c.JSON(user)
}
