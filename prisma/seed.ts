import { title } from "process";
import {prisma} from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
   data:{
    id: '2e7da195-9df3-49a9-b176-83051fdb1a98',
    title: 'Event 1',
    slug: 'event-1',
    details: 'Event 1 details',
    maximumAttendees: 10,
   }
  });
  seed().then(() => {
    console.log('Seed completed');
    prisma.$disconnect();
  });
}