import { ButtonType } from "../../utils/types";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonType;
}

const buttonTypeStyles = {
  default: "bg-gray-300 hover:bg-gray-400 text-black",
  success: "bg-green-500 hover:bg-green-400 text-white",
  black: "bg-black hover:bg-gray-700 text-white",
  white: "bg-white hover:bg-gray-300 text-black",
};

export default function CustomButton({ label, onClick, type }: ButtonProps) {
  const buttonColor = buttonTypeStyles[type];

  return (
    <button
      className={`px-4 py-2 rounded transition-colors duration-300 ${buttonColor}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
