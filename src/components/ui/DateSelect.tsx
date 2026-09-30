import { useState } from 'react'

import {
  MONTHS,
  getYearOptions,
} from '../../utils/dateUtils'

interface DateSelectProps {
  label: string
  value: string | null
  onChange: (value: string | null) => void
  disabled?: boolean
  error?: string
}

function splitDate(value: string | null) {
  if (!value) {
    return {
      month: '',
      year: '',
    }
  }

  const [year = '', month = ''] = value.split('-')

  return {
    month,
    year,
  }
}

function DateSelect({
  label,
  value,
  onChange,
  disabled = false,
  error,
}: DateSelectProps) {
  const initialParts = splitDate(value)

  const [month, setMonth] = useState(
    initialParts.month,
  )

  const [year, setYear] = useState(
    initialParts.year,
  )

  const handleMonthChange = (
    nextMonth: string,
  ) => {
    setMonth(nextMonth)

    if (nextMonth && year) {
      onChange(`${year}-${nextMonth}`)
      return
    }

    onChange(null)
  }

  const handleYearChange = (
    nextYear: string,
  ) => {
    setYear(nextYear)

    if (month && nextYear) {
      onChange(`${nextYear}-${month}`)
      return
    }

    onChange(null)
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="grid grid-cols-2 gap-3">
        <select
          value={month}
          disabled={disabled}
          onChange={(event) =>
            handleMonthChange(event.target.value)
          }
          className={`rounded-lg border bg-white px-3 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100'
          }`}
        >
          <option value="">Month</option>

          {MONTHS.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={year}
          disabled={disabled}
          onChange={(event) =>
            handleYearChange(event.target.value)
          }
          className={`rounded-lg border bg-white px-3 py-3 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100'
          }`}
        >
          <option value="">Year</option>

          {getYearOptions().map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default DateSelect
