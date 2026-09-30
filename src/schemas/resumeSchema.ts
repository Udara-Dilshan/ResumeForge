import * as z from 'zod'

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name is required'),

  professionalTitle: z
    .string()
    .trim()
    .min(2, 'Professional title is required'),

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

  location: z
    .string()
    .trim()
    .min(2, 'Location is required'),

  linkedinUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^https?:\/\/.+/i.test(value),
      'Enter a valid URL',
    ),

  githubUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^https?:\/\/.+/i.test(value),
      'Enter a valid URL',
    ),

  portfolioUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^https?:\/\/.+/i.test(value),
      'Enter a valid URL',
    ),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>