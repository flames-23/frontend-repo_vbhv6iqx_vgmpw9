import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [query, category])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/categories`)
      const data = await res.json()
      setCategories(data)
    } catch (e) {
      setCategories([])
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (category) params.set('category', category)
      const res = await fetch(`${baseUrl}/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === p.id)
      if (existing) {
        return prev.map((it) => it.id === p.id ? { ...it, qty: it.qty + 1 } : it)
      }
      return [...prev, { ...p, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <Header
        onSearch={setQuery}
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
        cartCount={cart.reduce((s, it) => s + it.qty, 0)}
        onToggleCart={() => setCartOpen((o) => !o)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Find your next device</h1>
          <p className="text-gray-600">Quality electronics at great prices.</p>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse h-72 bg-white/60 rounded-xl border" />
            ))}
          </div>
        ) : (
          products.length === 0 ? (
            <div className="text-center py-20 text-gray-600">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
          )
        )}
      </main>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  )
}

export default App
