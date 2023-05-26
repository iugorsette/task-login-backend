# Description

The User Registration and Authentication REST API is a project that provides a set of endpoints to allow users to register in a system and authenticate their credentials to access protected resources. The API is built using Node.js and utilizes the Express framework to create the endpoints and handle HTTP requests. The MongoDB database is used to store the data of registered users.

The main functionality of the API is to allow users to register by providing a username, an email address, and a password. These information are validated and securely stored in the database. Additionally, the API provides an authentication endpoint that allows users to log in by providing their credentials (username and password) and obtain an access token.

The access token is generated using the jsonwebtoken library and allows authenticated users to access restricted resources of the API. This token-based authentication helps ensure that only authenticated users have access to restricted resources.

The project utilizes security practices such as using bcryptjs to hash and verify the user's password during the registration and authentication process. Additionally, CORS is used to control and allow requests from different origins.

The project also includes support for Docker, which makes it easier to run the project in an isolated and portable environment.

This User Registration and Authentication API can be integrated into different applications and systems that require user authentication to protect resources and ensure data security.