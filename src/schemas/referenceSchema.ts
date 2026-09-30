import * as z from 'zod'

export const referenceItemSchema = z.object({
  id: z.string(),

  fullName: z
    .string()
    .trim()
    .min(2, 'Full name is required'),

  jobTitle: z
    .string()
    .trim()
    .min(2, 'Job title is required'),

  company: z
    .string()
    .trim()
    .min(2, 'Company is required'),

  email: z
    .string()
    .trim()
    .pipe(z.email('Enter a valid email address')),

  phoneCountryCode: z
    .string()
    .min(1, 'Select a country code'),

  phoneNumber: z
    .string()
    .trim()
    .min(5, 'Enter a valid phone number'),

  relationship: z
    .string()
    .trim()
    .min(2, 'Relationship is required'),
})

export const referencesSchema = z.object({
  references: z.array(referenceItemSchema),

  showReferences: z.boolean(),
})