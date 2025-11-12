import { useState } from 'react'

export default function Header({ onSearch, categories = [], selectedCategory, onSelectCategory, cartCount, onToggleCart }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <a href="/" className="text-xl font-bold text-blue-600">ElectroMart</a>
        <form onSubmit={submit} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search devices..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Search</button>
        </form>
        <div className="flex items-center gap-3">
          <select
            value={selectedCategory || ''}
            onChange={(e) => onSelectCategory(e.target.value || null)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={onToggleCart} className="relative px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
            )}
          </button>
          <a href="/test" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">System</a>
        </div>
      </div>
    </header>
  )
}
