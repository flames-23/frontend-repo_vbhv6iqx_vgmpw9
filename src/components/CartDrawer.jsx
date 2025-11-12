export default function CartDrawer({ open, items, onClose, onRemove }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-900">Close</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 border rounded-lg p-3">
                {it.image && (
                  <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{it.title}</h4>
                    <span className="text-sm font-semibold">${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Qty: {it.qty}</p>
                  <button onClick={() => onRemove(it.id)} className="text-xs text-red-600 mt-1 hover:underline">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60" disabled={items.length===0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
