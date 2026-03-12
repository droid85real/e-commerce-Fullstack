// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API documentation for the Ecommerce application",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/modules/**/*.routes.js"], // scan every route file for swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
