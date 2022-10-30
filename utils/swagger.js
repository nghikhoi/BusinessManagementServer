const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
import {version} from "../package.json";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/api/*.js", "./schema/*.js", "./schema/*.ts"],
});

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
