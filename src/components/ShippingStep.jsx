const ShippingStep = ({ shippingInfo, onUpdate }) => {
  return (
    <form className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium text-slate-600 sm:col-span-2">
        Full name
        <input
          type="text"
          name="fullName"
          value={shippingInfo.fullName}
          onChange={(event) => onUpdate("fullName", event.target.value)}
          placeholder="Avery Sloan"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </label>
      <label className="text-sm font-medium text-slate-600 sm:col-span-2">
        Street address
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={(event) => onUpdate("address", event.target.value)}
          placeholder="742 Evergreen Terrace"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </label>
      <label className="text-sm font-medium text-slate-600 sm:col-span-2">
        Email address
        <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={(event) => onUpdate("email", event.target.value)}
          placeholder="avery@email.com"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </label>
    </form>
  );
};

export default ShippingStep;

