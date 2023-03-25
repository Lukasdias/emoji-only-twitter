import * as z from "zod";

export const POST_SCHEMA = z.object({
  content: z.string().min(1).max(280).emoji({
    message: "Content must be a Emoji",
  }),
});

export type POST_FORM = z.infer<typeof POST_SCHEMA>;
