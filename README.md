# Typescript, Express, Sequelize boilerplate of REST API backend app

-   **ORM:** Sequelize
-   **Validation:** Joi
-   **Logger:** Log4js
-   **Authentication:** JWT
-   **Docker**

## Routes

| Method | Route         | Input                 | Output                    |
| ------ | ------------- | --------------------- | ------------------------- |
| POST   | /login        | email, password       | accessToken, refreshToken |
| POST   | /registration | name, email, password | email                     |
| POST   | /token        | token                 | accessToken, refreshToken |
| GET    | /profile      |                       | name, email               |
