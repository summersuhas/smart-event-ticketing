export default function EventFilters({
  search,
  onSearchChange,
  city,
  onCityChange,
  cities,
  when,
  onWhenChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="card mt-6 grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="block text-sm sm:col-span-2 lg:col-span-2">
        <span className="font-medium text-muted">Search</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Event, venue, city…"
          className="input-field"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-muted">City</span>
        <select value={city} onChange={(e) => onCityChange(e.target.value)} className="input-field">
          {cities.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All cities' : c}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-muted">When</span>
        <select value={when} onChange={(e) => onWhenChange(e.target.value)} className="input-field">
          <option value="all">Any time</option>
          <option value="week">Next 7 days</option>
          <option value="month">Next 30 days</option>
        </select>
      </label>
      <label className="block text-sm sm:col-span-2 lg:col-span-1">
        <span className="font-medium text-muted">Sort</span>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)} className="input-field">
          <option value="date-asc">Date (soonest)</option>
          <option value="date-desc">Date (latest)</option>
        </select>
      </label>
    </div>
  )
}
