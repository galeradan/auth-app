package utils

import (
	"github.com/dgrijalva/jwt-go"
)

func GetClaimsIssuer(cookie string) (string, error) {
	// Parses the cookie
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(GetEnv("SECRET")), nil
	})

	// Checks if the parsed cookie is authorized
	if err != nil {
		return "", err
	}

	// Gets the token Claims and converts to StandardClaims to get Issuer
	claims := token.Claims.(*jwt.StandardClaims)
	return claims.Issuer, nil
}
