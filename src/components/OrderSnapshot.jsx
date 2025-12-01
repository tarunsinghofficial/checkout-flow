const OrderSnapshot = ({
  cartItems,
  subtotal,
  shippingFee,
  discountPercent,
  discountAmount,
  total,
  formatCurrency,
}) => {
  return (
    <aside className="lg:w-[360px]">
      <div className="sticky top-10 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-highlight backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Order snapshot
        </p>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(shippingFee)}</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>SAVE10</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
            <span>Due today</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSnapshot;

