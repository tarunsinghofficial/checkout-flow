const CartStep = ({ cartItems, subtotal, onQuantityChange, formatCurrency }) => {
  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex-1">
            <p className="text-lg font-semibold text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-500">{item.description}</p>
          </div>
          <div className="flex items-center justify-between gap-6 sm:w-auto">
            <div className="flex items-center rounded-full border border-slate-200 bg-white shadow-inner">
              <button
                type="button"
                onClick={() => onQuantityChange(item.id, -1)}
                className="px-3 py-2 text-lg font-semibold text-slate-500 transition hover:text-slate-900"
              >
                –
              </button>
              <span className="min-w-[3ch] text-center text-base font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(item.id, 1)}
                className="px-3 py-2 text-lg font-semibold text-slate-500 transition hover:text-slate-900"
              >
                +
              </button>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-slate-900">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <p className="text-xs text-slate-500">
                @ {formatCurrency(item.price)} ea
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-inner">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Subtotal
          </p>
          <p className="text-xs text-slate-500">Shipping + tax calculated next</p>
        </div>
        <p className="text-xl font-semibold text-slate-900">
          {formatCurrency(subtotal)}
        </p>
      </div>
    </div>
  );
};

export default CartStep;

