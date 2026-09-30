import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import TextInput from '../ui/TextInput'
import CountrySelect from '../ui/CountrySelect'

import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from '../../schemas/resumeSchema'

import { useResumeStore } from '../../store/resumeStore'
import type { ProfilePhotoMimeType } from '../../types/resume'

const MAX_PHOTO_SIZE = 2 * 1024 * 1024

const allowedTypes: ProfilePhotoMimeType[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

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

  const [photoError, setPhotoError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    setPhotoError('')

    if (!file) {
      return
    }

    if (!allowedTypes.includes(file.type as ProfilePhotoMimeType)) {
      setPhotoError('Please select a JPG, PNG, or WebP image.')
      return
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Photo must be 2 MB or smaller.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setPhotoError('Unable to read the selected image.')
        return
      }

      updatePersonalInfo({
        photo: {
          dataUrl: reader.result,
          fileName: file.name,
          mimeType: file.type as ProfilePhotoMimeType,
        },
      })
    }

    reader.onerror = () => {
      setPhotoError('Unable to read the selected image.')
    }

    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    updatePersonalInfo({
      photo: null,
    })

    setPhotoError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Profile Photo */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-700">
            Profile Photo
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Optional. JPG, PNG, or WebP. Maximum 2 MB.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo.dataUrl}
              alt="Profile preview"
              className="h-24 w-24 rounded-xl object-cover ring-1 ring-slate-200"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
              No photo
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="profilePhoto"
              className="inline-flex cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Choose Photo
            </label>

            <input
              ref={fileInputRef}
              id="profilePhoto"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="sr-only"
            />

            {personalInfo.photo && (
              <button
                type="button"
                onClick={removePhoto}
                className="ml-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            )}

            {photoError && (
              <p
                className="text-sm text-red-600"
                role="alert"
              >
                {photoError}
              </p>
            )}
          </div>
        </div>
      </div>

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
    <div
  className="border-t border-slate-200 pt-6"
>
  <button
    type="submit"
    className="w-full rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto sm:float-right"
  >
    Next
  </button>
</div>
    </form>
  )
}

export default PersonalInfoStep