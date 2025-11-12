export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      {product.image && (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3.2rem]">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
