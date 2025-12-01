const ConfirmationStep = ({
  orderNumber,
  shippingInfo,
  paymentInfo,
  cartItems,
  subtotal,
  shippingFee,
  discountPercent,
  discountAmount,
  total,
  formatCurrency,
}) => {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-inner">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">
          Order number
        </p>
        <p className="text-2xl font-semibold text-slate-900">
          #{orderNumber ?? "pending"}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Shipping to
          </p>
          <p className="text-base font-semibold text-slate-900">
            {shippingInfo.fullName || "Awaiting name"}
          </p>
          <p className="text-sm text-slate-600">
            {shippingInfo.address || "No address provided yet"}
          </p>
          <p className="text-sm text-slate-500">
            {shippingInfo.email || "No email yet"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Payment method
          </p>
          <p className="text-base font-semibold text-slate-900">
            {paymentInfo.cardNumber
              ? `•••• ${paymentInfo.cardNumber.slice(-4)}`
              : "Card pending"}
          </p>
          <p className="text-sm text-slate-500">
            Charged {formatCurrency(total)} once the order ships.
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Items</p>
        <ul className="mt-3 space-y-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm font-medium text-slate-700"
            >
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-1 text-sm text-slate-600">
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
            <span>Discount (SAVE10)</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;

