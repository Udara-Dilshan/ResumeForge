import * as z from 'zod'

export const skillsSchema = z.object({
  skills: z.array(z.string().trim().min(1)),
})

export type SkillsFormData = z.infer<typeof skillsSchema>