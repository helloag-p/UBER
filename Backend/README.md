1. POST /users/register
Description:
This endpoint allows a user to register an account by providing their first name, last name, email, and password. The email must be unique, and the password must meet the required length.

Request Body:
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
Validation:

firstname: Must be at least 3 characters long.
lastname: Must be at least 3 characters long.
email: Must be a valid email address and unique.
password: Must be at least 6 characters long.
Success Response:

Status Code: 201 Created
Body:
{
  "token": "your_jwt_token",
  "user": {
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
Error Response:

Status Code: 400 Bad Request
Body:
json

{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
2. POST /users/login
Description:
This endpoint allows an existing user to log in by providing their email and password. If the credentials are correct, it returns a JWT token to authenticate the user.

Request Body:

json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
Validation:

email: Must be a valid email format.
password: Must be at least 6 characters long.
Success Response:

Status Code: 200 OK
Body:
json
{
  "message": "Login successful",
  "token": "your_jwt_token",
  "user": {
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
Error Response:

Status Code: 400 Bad Request
Body:
json
{
  "message": "Invalid email or password"
}
3. GET /users/profile
Description:
This endpoint allows the logged-in user to view their profile details. The user must be authenticated with a valid JWT token.

Headers:

Authorization: Bearer <JWT_TOKEN>
Success Response:

Status Code: 200 OK
Body:
json
{
  "id": "user_id",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
Error Response:

Status Code: 401 Unauthorized
Body:
json
{
  "message": "Unauthorized"
}
4. GET /users/logout
Description:
This endpoint logs the user out by clearing their JWT token from the cookies and adding it to the blacklist to prevent future usage.

Headers:

Authorization: Bearer <JWT_TOKEN>
Success Response:

Status Code: 200 OK
Body:
json
{
  "message": "Logged out"
}
Error Response:

Status Code: 401 Unauthorized
Body:
json
{
  "message": "Unauthorized"
}
Notes:
JWT Token Expiration: The JWT token has a TTL (Time to Live) of 24 hours, after which the user will need to log in again.
Authentication: Users must include the JWT token in the Authorization header for requests that require authentication (/users/profile, /users/logout).


