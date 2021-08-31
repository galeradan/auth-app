package controllers

import (
	"github.com/galeradan/auth-app/backend/database"
	"github.com/galeradan/auth-app/backend/models"
	"github.com/galeradan/auth-app/backend/utils"
	"github.com/gofiber/fiber/v2"
)

func UpdateUser(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Get's the cookie
	cookie := c.Cookies("jwt")

	issuer, err := utils.GetClaimsIssuer(cookie)

	// Checks if the parsed cookie is authorized
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Gets the User's record and set new values
	var user models.User
	database.DB.Where("id = ?", issuer).First(&user)

	user.Name = data["name"]
	user.Email = data["email"]

	if err := database.DB.Save(&user).Error; err != nil {
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(user)
}
