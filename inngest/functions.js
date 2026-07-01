import { inngest } from "./client";
import prisma from "@/lib/prisma";

// Inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" }, // <-- Argument 1: Config
  { event: "clerk/user.created" }, // <-- Argument 2: Trigger
  async ({ event }) => {
    // <-- Argument 3: Handler
    const { data } = event;
    await prisma.user.create({
      data: {
        id: event.data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);

// Inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-updation" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: {
        id: event.data.id,
      },
      data: {
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  },
);

// Inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: {
        id: event.data.id,
      },
    });
  },
);
