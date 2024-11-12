import {
  BadRequest
} from "./chunk-RVWQBNOU.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = async (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Erro de valida\xE7\xE3o`,
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({
      message: error.message
    });
  }
  return reply.status(500).send({
    message: "Internal server error"
  });
};

export {
  errorHandler
};
