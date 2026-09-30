import { countries } from '../../data/countries'

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

function CountrySelect({
  value,
  onChange,
  error,
}: CountrySelectProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="phoneCountryCode"
        className="block text-sm font-medium text-slate-700"
      >
        Country
      </label>

      <select
        id="phoneCountryCode"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:ring-red-100'
            : 'border-slate-300 focus:border-slate-500 focus:ring-slate-100'
        }`}
      >
        {countries.map((country) => (
          <option
            key={`${country.name}-${country.code}`}
            value={country.code}
          >
            {country.flag} {country.name} ({country.code})
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default CountrySelect