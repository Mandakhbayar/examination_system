import { ButtonType } from "../../utils/types";
import styles from '@/styles/auth.module.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonType;
}

const buttonTypeStyles = {
  default: "bg-gray-300 hover:bg-gray-400 text-black",
  success: "bg-green-500 hover:bg-green-400 text-white",
  next: "bg-black hover:bg-gray-700 text-white",
  black: styles.submitButton,
  white: styles.secondButton,
};

export default function CustomButton({ label, onClick, type }: ButtonProps) {
  const buttonColor = buttonTypeStyles[type];

  return (
    <button
      className={`px-6 py-2 rounded transition-colors duration-300 ${buttonColor}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
