import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Clock, CreditCard, ChefHat, Truck } from "lucide-react";

// ==================== STEPPER COMPONENT ====================
function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  hideFooter = false,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full" {...rest}>
      <div
        className={`w-full rounded-lg shadow-xl ${stepCircleContainerClassName}`}
        style={{ border: "1px solid #374151" }}
      >
        <div
          className={`${stepContainerClassName} flex w-full items-center p-6`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-6 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>
        {!isCompleted && !hideFooter && (
          <div className={`px-6 pb-6 ${footerClassName}`}>
            <div
              className={`mt-6 flex ${
                currentStep !== 1 ? "justify-between" : "justify-end"
              }`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`rounded px-4 py-2 transition ${
                    currentStep === 1
                      ? "pointer-events-none opacity-50 text-gray-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="flex items-center justify-center rounded-full bg-green-500 py-2 px-5 font-medium text-white transition hover:bg-green-600"
                {...nextButtonProps}
              >
                {isLastStep ? "Complete" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

function Step({ children }) {
  return <div className="py-4">{children}</div>;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#374151", color: "#9ca3af" },
          active: { scale: 1, backgroundColor: "#f97316", color: "#ffffff" },
          complete: { scale: 1, backgroundColor: "#22c55e", color: "#ffffff" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-10 w-10 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#22c55e" },
  };

  return (
    <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded bg-gray-600">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ==================== ORDER STEPPER COMPONENT ====================
export function OrderStepper({ order }) {
  const getStepFromStatus = (orderStatus, paymentStatus) => {
    const status = orderStatus?.toLowerCase();
    const payment = paymentStatus?.toLowerCase();

    if (status === "delivered") return 5;
    if (status === "preparing") return 4;
    if (payment === "paid" && status === "accepted") return 3;
    if (status === "accepted") return 2;
    return 1;
  };

  const currentStep = getStepFromStatus(order.orderStatus, order.paymentStatus);

  return (
    <Stepper
      initialStep={currentStep}
      disableStepIndicators={true}
      hideFooter={true}
      stepCircleContainerClassName="bg-transparent border-0"
      stepContainerClassName="px-2"
      contentClassName="px-2"
    >
      <Step>
        <div className="flex items-center space-x-3">
          <Clock className="text-yellow-500" size={20} />
          <div>
            <p className="text-white font-semibold text-sm">Order Placed</p>
            <p className="text-gray-400 text-xs">Waiting for chef</p>
          </div>
        </div>
      </Step>
      <Step>
        <div className="flex items-center space-x-3">
          <CheckCircle className="text-blue-500" size={20} />
          <div>
            <p className="text-white font-semibold text-sm">Order Accepted</p>
            <p className="text-gray-400 text-xs">Proceed with payment</p>
          </div>
        </div>
      </Step>
      <Step>
        <div className="flex items-center space-x-3">
          <CreditCard className="text-green-500" size={20} />
          <div>
            <p className="text-white font-semibold text-sm">
              Payment Completed
            </p>
            <p className="text-gray-400 text-xs">Chef will prepare</p>
          </div>
        </div>
      </Step>
      <Step>
        <div className="flex items-center space-x-3">
          <ChefHat className="text-orange-500" size={20} />
          <div>
            <p className="text-white font-semibold text-sm">Preparing</p>
            <p className="text-gray-400 text-xs">Meal being cooked</p>
          </div>
        </div>
      </Step>
      <Step>
        <div className="flex items-center space-x-3">
          <Truck className="text-green-500" size={20} />
          <div>
            <p className="text-white font-semibold text-sm">Delivered</p>
            <p className="text-gray-400 text-xs">Enjoy your meal!</p>
          </div>
        </div>
      </Step>
    </Stepper>
  );
}

// ==================== ORDER CARD COMPONENT ====================
export function OrderCard({ order, onPayment, formatDate }) {
  const shouldShowPayButton = (order) => {
    return (
      order.orderStatus?.toLowerCase() === "accepted" &&
      order.paymentStatus?.toLowerCase() === "pending"
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-blue-100 text-blue-800",
      preparing: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getPaymentColor = (status) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {order.mealName}
            </h3>
            <p className="text-gray-400 text-sm">Order ID: {order.foodId}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">
              ${(order.price * order.quantity).toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              ${order.price} × {order.quantity}
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentColor(
              order.paymentStatus
            )}`}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Stepper Section */}
      <div className="p-6 bg-gray-900/50">
        <OrderStepper order={order} />
      </div>

      {/* Payment Button Section */}
      {shouldShowPayButton(order) && (
        <div className="p-6 bg-gradient-to-r from-green-900/20 to-green-800/20 border-t border-green-700/50">
          <button
            onClick={() => onPayment(order)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <CreditCard size={20} />
            <span>Pay Now - ${(order.price * order.quantity).toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-6 bg-gray-900/30 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Chef</p>
            <p className="text-white font-semibold">{order.chefName}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-1">Order Time</p>
            <p className="text-white font-semibold">
              {formatDate(order.orderTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Stepper and Step for direct use
export { Stepper, Step };
export default Stepper;
