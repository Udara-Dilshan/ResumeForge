import * as z from 'zod'

const resumeDateSchema = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])$/,
    'Select a valid month and year',
  )

export const certificationItemSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .trim()
    .min(2, 'Certification name is required'),

  issuer: z
    .string()
    .trim()
    .min(2, 'Issuer is required'),

  issueDate: resumeDateSchema.nullable(),

  credentialUrl: z.string(),
})

export const certificationsSchema = z.object({
  certifications: z.array(
    certificationItemSchema,
  ),
})