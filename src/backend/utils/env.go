package utils

import (
	"os"
)

func GetEnv(key string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		panic("The following env is missing " + key)
	}
	return val
}
