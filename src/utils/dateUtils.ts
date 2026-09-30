export const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

export function getYearOptions(range = 70) {
  const currentYear = new Date().getFullYear()

  return Array.from(
    { length: range + 1 },
    (_, index) => String(currentYear - range + index),
  )
}

export function splitResumeDate(value: string | null) {
  if (!value) {
    return {
      month: '',
      year: '',
    }
  }

  const [year, month] = value.split('-')

  return {
    month: month ?? '',
    year: year ?? '',
  }
}

export function buildResumeDate(
  month: string,
  year: string,
) {
  if (!month || !year) {
    return null
  }

  return `${year}-${month}`
}