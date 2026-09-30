import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import TextInput from '../ui/TextInput'
import CountrySelect from '../ui/CountrySelect'

import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from '../../schemas/resumeSchema'

import { useResumeStore } from '../../store/resumeStore'

function PersonalInfoStep() {
  const personalInfo = useResumeStore(
    (state) => state.resume.personalInfo,
  )

  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo,
  )

  const nextStep = useResumeStore(
    (state) => state.nextStep,
  )

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),

    defaultValues: {
      fullName: personalInfo.fullName,
      professionalTitle: personalInfo.professionalTitle,
      email: personalInfo.email,
      phoneCountryCode: personalInfo.phoneCountryCode,
      phoneNumber: personalInfo.phoneNumber,
      location: personalInfo.location,
      linkedinUrl: personalInfo.linkedinUrl,
      githubUrl: personalInfo.githubUrl,
      portfolioUrl: personalInfo.portfolioUrl,
    },
  })

  useEffect(() => {
    reset({
      fullName: personalInfo.fullName,
      professionalTitle: personalInfo.professionalTitle,
      email: personalInfo.email,
      phoneCountryCode: personalInfo.phoneCountryCode,
      phoneNumber: personalInfo.phoneNumber,
      location: personalInfo.location,
      linkedinUrl: personalInfo.linkedinUrl,
      githubUrl: personalInfo.githubUrl,
      portfolioUrl: personalInfo.portfolioUrl,
    })
  }, [personalInfo, reset])

  const onSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data)
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Full Name */}
      <TextInput
        id="fullName"
        label="Full Name"
        placeholder="Udara Dilshan"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      {/* Professional Title */}
      <TextInput
        id="professionalTitle"
        label="Professional Title"
        placeholder="BICT Undergraduate"
        {...register('professionalTitle')}
        error={errors.professionalTitle?.message}
      />

      {/* Email */}
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      {/* Phone */}
      <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr]">
        <Controller
          name="phoneCountryCode"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChange={field.onChange}
              error={errors.phoneCountryCode?.message}
            />
          )}
        />

        <TextInput
          id="phoneNumber"
          type="tel"
          label="Phone Number"
          placeholder="771234567"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
      </div>

      {/* Location */}
      <TextInput
        id="location"
        label="Location"
        placeholder="Tangalle, Sri Lanka"
        {...register('location')}
        error={errors.location?.message}
      />

      {/* LinkedIn */}
      <TextInput
        id="linkedinUrl"
        type="url"
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/your-name"
        {...register('linkedinUrl')}
        error={errors.linkedinUrl?.message}
      />

      {/* GitHub */}
      <TextInput
        id="githubUrl"
        type="url"
        label="GitHub URL"
        placeholder="https://github.com/your-username"
        {...register('githubUrl')}
        error={errors.githubUrl?.message}
      />

      {/* Portfolio */}
      <TextInput
        id="portfolioUrl"
        type="url"
        label="Portfolio / Personal Website"
        placeholder="https://yourwebsite.com"
        {...register('portfolioUrl')}
        error={errors.portfolioUrl?.message}
      />

      {/* Navigation */}
      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default PersonalInfoStep