package database

import (
	"database/sql"
	"fmt"

	"github.com/galeradan/auth-app/src/backend/models"
	"github.com/galeradan/auth-app/src/backend/utils"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Global variable equivalent to connection
var DB *gorm.DB

func Connect() {
	username := utils.GetEnv("DB_USER")
	password := utils.GetEnv("DB_PASS")
	dbName := utils.GetEnv("DB_NAME")
	dbHost := utils.GetEnv("DB_HOST")
	dbPORT := utils.GetEnv("DB_PORT")
	dbEnv := utils.GetEnv("DB_ENV")
	dsn := ""

	// builds the data source name
	if dbEnv == "production" {
		dsn = fmt.Sprintf("%s:%s@%s/%s", username, password, dbHost, dbName)
	} else {
		dsn = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", username, password, dbHost, dbPORT, dbName)
	}

	// Initialize connection to database
	sqlDB, err := sql.Open("mysql", dsn)
	connection, err := gorm.Open(mysql.New(mysql.Config{
		Conn: sqlDB,
	}), &gorm.Config{})

	// Report database connection error
	if err != nil {
		panic("Could not connect to database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})

}
