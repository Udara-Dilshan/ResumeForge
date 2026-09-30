import * as z from 'zod'

const resumeDateSchema = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])$/,
    'Select a valid month and year',
  )

export const educationItemSchema = z
  .object({
    id: z.string(),

    degree: z
      .string()
      .trim()
      .min(2, 'Degree or qualification is required'),

    institution: z
      .string()
      .trim()
      .min(2, 'Institution is required'),

    location: z.string(),

    startDate: resumeDateSchema.nullable(),

    endDate: resumeDateSchema.nullable(),

    currentlyStudying: z.boolean(),

    description: z.string(),
  })
  .superRefine((item, context) => {
    if (!item.startDate) {
      context.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Start date is required',
      })
    }

    if (!item.currentlyStudying && !item.endDate) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date is required',
      })
    }
  })

export const educationSchema = z.object({
  education: z.array(educationItemSchema),
})