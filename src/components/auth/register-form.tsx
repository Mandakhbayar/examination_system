// components/RegisterForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import styles from "@/styles/auth.module.css";
import Alert from "../ui/alert";
import { useRouter } from "next/navigation";
import { Routes } from "../../utils/routes";
import { AlertType } from "../../utils/types";

interface RegisterFormType {
  email: string;
  password: string;
  confirmPassword: string; // Additional field for registration
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    setMessage(null);
    setAlertType("error");

    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertType("success");
        setMessage("Registration successful!");
        router.push(Routes.auth.login);
      } else {
        const result = await response.json();
        setMessage(result.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Failed to register. Please try again.");
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(Routes.auth.login);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.title}>Register</label>
      {message && <Alert message={message} type={alertType} />}

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password:
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.input}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
        />
        {errors.confirmPassword && (
          <p className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Register
      </button>
      <button onClick={handleLoginClick} className={styles.secondButton}>
        Login
      </button>
    </form>
  );
}
