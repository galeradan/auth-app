package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return err
}

func GetEnv(key string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		panic("The following env is missing " + key)
	}
	return val
}
