import type { FastifyBaseLogger, FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad_request";

export async function getAttendeeBadge(app: FastifyInstance){
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/attendees/:attendeeId/badge', {
    schema:{
      summary: "Obter crachá de um participante",
      tags: ["Participantes"],
      params: z.object({
        attendeeId: z.coerce.number().int(),
      }),
      response:{
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string().email(),
            eventTitle: z.string(),
            checkInUrl: z.string().url(),
          }),
        }),
      },
      }
  },async (request, reply) => {
    const { attendeeId } = request.params
    
    
    const attendee = await prisma.attendee.findUnique({
      where: {
        id: attendeeId,
      },
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          },
        },
      },
    })
      if (attendee === null) {
        throw new BadRequest("Attendee not found");
      }
      request.url

      const baseUrl = `${request.protocol}://${request.hostname}`

      const checkInUrl =  new URL(`/attendees/${attendeeId}/check-in`, baseUrl)
      return reply.send({
        badge: {
            name: attendee.name,
            email: attendee.email,
            eventTitle: attendee.event.title,
            checkInUrl: checkInUrl.toString(),
          }
       })
    })
}