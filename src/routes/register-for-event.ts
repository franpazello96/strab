import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad_request";

export async function registerForEvent (app: FastifyInstance){
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/events/:eventId/attendees', {
    schema: {
      summary: "Registrar participante em um evento",
      tags: ["Participantes"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email(),
      }),
      params: z.object({
        eventId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          attendeeId: z.number(),
        })
      }
    }
  }, async (request, reply) => {
    const {eventId} = request.params; // pegar o id do evento
    const {name, email} = request.body; // pegar o nome e email do participante
    
// verificar se o participante já está cadastrado
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          eventId,
          email,
        }
       } 
    }) 

    if (attendeeFromEmail !== null) {
      throw new BadRequest("This e-mail is already registered for this event");
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId,
        }, 
      }),

      prisma.attendee.count({
        where: {
          eventId,
        }
      })
    ])

// verificar se o evento está cheio
    if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
      throw new BadRequest("Event is full");
    }
    
// cadastrar um novo participante
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId, 
     }
  })
    return reply.status(201).send({ attendeeId: attendee.id })
  })
}