const PaymentStep = ({
  paymentInfo,
  couponInput,
  couponStatus,
  onPaymentChange,
  onCouponInputChange,
  onApplyCoupon,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-slate-600 text-sm font-medium">
          Card number
          <input
            type="text"
            inputMode="numeric"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={(event) =>
              onPaymentChange("cardNumber", event.target.value)
            }
            placeholder="4242 4242 4242 4242"
            className="border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 px-4 py-3 mt-1 w-full text-base bg-white rounded-xl border shadow-inner"
          />
        </label>
        <div className="sm:grid-cols-2 grid gap-4">
          <label className="text-slate-600 text-sm font-medium">
            Expiration
            <input
              type="text"
              name="expiry"
              value={paymentInfo.expiry}
              onChange={(event) =>
                onPaymentChange("expiry", event.target.value)
              }
              placeholder="MM / YY"
              className="border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 px-4 py-3 mt-1 w-full text-base bg-white rounded-xl border shadow-inner"
            />
          </label>
          <label className="text-slate-600 text-sm font-medium">
            CVC
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={(event) => onPaymentChange("cvv", event.target.value)}
              placeholder="123"
              className="border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 px-4 py-3 mt-1 w-full text-base bg-white rounded-xl border shadow-inner"
            />
          </label>
        </div>
      </div>
      <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200 border-dashed">
        <p className="text-sm font-semibold text-indigo-700">Have a coupon?</p>
        <div className="sm:flex-row flex flex-col gap-3 mt-3">
          <input
            type="text"
            value={couponInput}
            onChange={(event) => onCouponInputChange(event.target.value)}
            placeholder="SAVE10"
            className="text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 px-4 py-3 w-full text-base bg-white rounded-xl border border-indigo-200 shadow-inner"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className="hover:bg-indigo-500 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-xl transition"
          >
            Apply
          </button>
        </div>
        {couponStatus === "applied" && (
          <p className="sm:block hidden pt-3 text-sm font-medium text-emerald-600">
            SAVE10 applied — enjoying 10% off the subtotal.
          </p>
        )}
        {couponStatus === "invalid" && (
          <p className="sm:block hidden pt-3 text-sm font-medium text-rose-600">
            That code is not active. Try SAVE10 for this order.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStep;
