package database

import (
	"github.com/galeradan/auth-app/backend/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() {
	// Initialize connection to database
	connection, err := gorm.Open(mysql.Open("root:root@/auth_app_db"), &gorm.Config{})

	// Report database connection error
	if err != nil {
		panic("Could not connect to database")
	}

	connection.AutoMigrate(&models.User{})

}
