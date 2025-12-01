import { useMemo, useState } from "react";
import CartStep from "./components/CartStep";
import ConfirmationStep from "./components/ConfirmationStep";
import OrderSnapshot from "./components/OrderSnapshot";
import PaymentStep from "./components/PaymentStep";
import ShippingStep from "./components/ShippingStep";
import StepIndicator from "./components/StepIndicator";

const steps = ["Cart", "Shipping", "Payment", "Confirmation"];
const stepDescriptions = {
  1: "Review the items in your cart and adjust quantities before checking out.",
  2: "Tell us where to ship your goodies. We use your email for status updates.",
  3: "Securely enter your payment details and add a coupon code if you have one.",
  4: "Your order is locked in. Save the summary below for your records.",
};

const initialCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling · Midnight black",
    price: 189,
    quantity: 1,
  },
  {
    id: 2,
    name: "Travel Backpack",
    description: "35L · Water resistant",
    price: 129,
    quantity: 1,
  },
  {
    id: 3,
    name: "Charging Station",
    description: "MagSafe · 3-in-1",
    price: 89,
    quantity: 2,
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SHIPPING_FEE = 12;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(initialCart);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  const discountAmount = useMemo(
    () => Number(subtotal * discountPercent),
    [subtotal, discountPercent]
  );

  const total = useMemo(
    () => Math.max(subtotal - discountAmount + SHIPPING_FEE, 0),
    [subtotal, discountAmount]
  );

  const handleQuantityChange = (itemId, delta) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== itemId) return item;
        const nextQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQuantity };
      })
    );
  };

  const updateShipping = (field, value) => {
    setShippingInfo((info) => ({ ...info, [field]: value }));
  };

  const updatePayment = (field, value) => {
    setPaymentInfo((info) => ({ ...info, [field]: value }));
  };

  const applyCoupon = () => {
    const normalizedCode = couponInput.trim().toUpperCase();
    if (!normalizedCode) {
      setDiscountPercent(0);
      setCouponStatus(null);
      return;
    }

    if (normalizedCode === "SAVE10") {
      setDiscountPercent(0.1);
      setCouponStatus("applied");
      return;
    }

    setDiscountPercent(0);
    setCouponStatus("invalid");
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const goForward = () => {
    if (currentStep === steps.length) {
      setCurrentStep(1);
      setOrderNumber(null);
      return;
    }

    if (currentStep === steps.length - 1) {
      setOrderNumber(Math.floor(100000 + Math.random() * 900000));
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const formatCurrency = (value) => currencyFormatter.format(value);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CartStep
            cartItems={cartItems}
            subtotal={subtotal}
            onQuantityChange={handleQuantityChange}
            formatCurrency={formatCurrency}
          />
        );
      case 2:
        return (
          <ShippingStep shippingInfo={shippingInfo} onUpdate={updateShipping} />
        );
      case 3:
        return (
          <PaymentStep
            paymentInfo={paymentInfo}
            couponInput={couponInput}
            couponStatus={couponStatus}
            onPaymentChange={updatePayment}
            onCouponInputChange={setCouponInput}
            onApplyCoupon={applyCoupon}
          />
        );
      case 4:
      default:
        return (
          <ConfirmationStep
            orderNumber={orderNumber}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            cartItems={cartItems}
            subtotal={subtotal}
            shippingFee={SHIPPING_FEE}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            total={total}
            formatCurrency={formatCurrency}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-10">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-[32px] bg-white/90 p-6 shadow-highlight backdrop-blur-sm lg:p-10">
          <div className="space-y-6">
            <StepIndicator steps={steps} currentStep={currentStep} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                Step {currentStep} of {steps.length}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                {steps[currentStep - 1]}
              </h1>
              <p className="mt-2 text-base text-slate-600">
                {stepDescriptions[currentStep] ?? ""}
              </p>
            </div>
            <div>{renderStepContent()}</div>
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 1}
                className="rounded-2xl border border-slate-200 px-6 py-3 text-base font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
              >
                Back
              </button>
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={goForward}
                  className="rounded-2xl bg-slate-900 px-8 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  {currentStep === 3 ? "Place order" : "Continue"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goForward}
                  className="rounded-2xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
                >
                  Start new order
                </button>
              )}
            </div>
          </div>
        </section>
        <OrderSnapshot
          cartItems={cartItems}
          subtotal={subtotal}
          shippingFee={SHIPPING_FEE}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          total={total}
          formatCurrency={formatCurrency}
        />
      </main>
    </div>
  );
}

export default App;
