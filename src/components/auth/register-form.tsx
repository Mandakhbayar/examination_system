// components/RegisterForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import styles from "@/styles/auth.module.css";
import Alert from "../ui/alert";
import { useRouter } from "next/navigation";
import { Routes } from "../../utils/routes";

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
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
        alert("Registration successful!");
        router.push(Routes.auth.login); // Redirect to login or another page after successful registration
      } else {
        const result = await response.json();
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(Routes.auth.login);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.title}>Register</label>
      {error && <Alert message={error} type="error" />}

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
