import {
  getEvent
} from "./chunk-LSTVE333.mjs";
import {
  registerForEvent
} from "./chunk-WUSQ7CXT.mjs";
import {
  errorHandler
} from "./chunk-EEGKQGKF.mjs";
import {
  checkIn
} from "./chunk-4A6YLCDA.mjs";
import {
  createEvent
} from "./chunk-LDDFNMVG.mjs";
import "./chunk-677O5SV4.mjs";
import {
  getAttendeeBadge
} from "./chunk-UI6NOTSR.mjs";
import "./chunk-RVWQBNOU.mjs";
import {
  getEventAttendees
} from "./chunk-WUPW34OU.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Event",
      description: "Especifica\xE7\xF5es da API de eventos",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
}), app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on port 3333");
});
export {
  app
};
