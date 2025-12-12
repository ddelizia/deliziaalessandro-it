import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        author: z.string().default('Delizia Alessandro'),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
    }),
});

const brands = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        description: z.string(),
        logo: z.string(),
        website: z.string().url(),
        images: z.array(z.string()).default([]),
        order: z.number().default(0),
        categories: z.array(z.string()).default([]),
    }),
});

const categories = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        description: z.string(),
        images: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, brands, categories };
