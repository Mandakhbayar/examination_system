import React from "react";
import { DialogDetailType } from "../../utils/types";
import CustomButton from "./button";

const dialogTypeStyles = {
  info: {
    bgColor: "bg-white",
    borderColor: "border-gray-400",
    textColor: "text-black",
    icon: "ℹ️",
    titleColor: "text-black",
    title: "Information",
  },
  warning: {
    bgColor: "bg-gray-800",
    borderColor: "border-yellow-400",
    textColor: "text-black",
    icon: "⚠️",
    titleColor: "text-yellow-300",
    title: "Warning",
  },
  error: {
    bgColor: "bg-white",
    borderColor: "border-red-400",
    textColor: "text-black",
    icon: "❌",
    titleColor: "text-red-300",
    title: "Error",
  },
  success: {
    bgColor: "bg-white",
    borderColor: "border-green-400",
    textColor: "text-black",
    icon: "✅",
    titleColor: "text-green-300",
    title: "Success",
  },
};

const Dialog: React.FC<DialogDetailType> = ({
  type,
  message,
  onClose,
  onComplete,
}) => {
  const { bgColor, borderColor, textColor, titleColor, icon, title } =
    dialogTypeStyles[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      {/* Dialog Box */}
      <div
        className={`relative z-10 w-11/12 max-w-lg p-6 rounded-lg shadow-lg border-l-4 ${bgColor} ${borderColor} ${titleColor}`}
      >
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div className="text-3xl">{icon}</div>

          {/* Title */}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {/* Message */}
        <p className={`mt-4 text-lg ${textColor}`}>{message}</p>

        {/* Close Button */}
        <div className="flex mt-6 justify-end gap-2">
          <CustomButton label="Close" styleType="default" onClick={onClose} />
          {onComplete && (
            <CustomButton label="OK" styleType="next" onClick={onComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
