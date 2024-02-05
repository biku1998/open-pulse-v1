import { z } from "zod";

const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  userId: z.string().uuid().nullable(),
  channelId: z.string().uuid(),
  createdBy: z.string().uuid(),
  createdAt: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
