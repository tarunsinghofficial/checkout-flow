const StepIndicator = ({ steps, currentStep }) => {
  const progress =
    steps.length > 1
      ? ((currentStep - 1) / (steps.length - 1)) * 100
      : currentStep === steps.length
        ? 100
        : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {steps.map((label, index) => {
          const stepNumber = index + 1
          const state =
            stepNumber === currentStep
              ? "current"
              : stepNumber < currentStep
                ? "complete"
                : "upcoming"

          return (
            <span
              key={label}
              className={
                state === "current"
                  ? "text-indigo-600"
                  : state === "complete"
                    ? "text-slate-900"
                    : "text-slate-400"
              }
            >
              {label}
            </span>
          )
        })}
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <span
          className="block h-full rounded-full bg-indigo-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;

