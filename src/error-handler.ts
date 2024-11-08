import { FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/bad_request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = async (error, request, reply) => {

if (error instanceof ZodError) {
  return reply.status(400).send({
    message: `Erro de validação`,
    errors: error.flatten().fieldErrors,
  })
}

if (error instanceof BadRequest) {
  return reply.status(400).send({ message: error.message,
  })
}

return reply.status(500).send({ message: "Internal server error",
})
}