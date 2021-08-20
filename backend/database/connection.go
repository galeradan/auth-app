package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() {
	// Initialize connection to database
	_, err := gorm.Open(mysql.Open("root:root@/auth_app_db"), &gorm.Config{})

	// Report database connection error
	if err != nil {
		panic("Could not connect to database")
	}

}
