import * as z from 'zod'

export const projectItemSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .trim()
    .min(2, 'Project name is required'),

  description: z.string(),

  technologies: z.array(
    z.string().trim().min(1),
  ),

  liveDemoUrl: z.string(),

  githubUrl: z.string(),
})

export const projectsSchema = z.object({
  projects: z.array(projectItemSchema),
})