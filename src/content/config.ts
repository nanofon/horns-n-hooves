import { defineCollection, z } from "astro:content";

const analytics = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    publishDate: z.coerce.date(),
    image: z.string().optional(),
  }),
});

export const collections = { analytics };
