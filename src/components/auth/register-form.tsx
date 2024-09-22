// components/RegisterForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "@/styles/auth.module.css";
import Alert from "../ui/alert";
import { useRouter } from "next/navigation";
import { Routes } from "../../utils/routes";
import { AlertType, User } from "../../utils/types";
import { DefaultStrings, ErrorStrings } from "../../utils/strings";
import useAuth from "../../hooks/use-auth";
import { Constants } from "../../utils/constants";



export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);
  const router = useRouter();
  const { user } = useAuth();

  const onSubmit: SubmitHandler<User> = async (data) => {
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

  useEffect(() => {
    if (user) {
      router.push(Routes.private.lessons);
    }
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainerRegister}
    >
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
          placeholder={DefaultStrings.EMAIL_INPUT_PLACEHOLDER}
          {...register("email", {
            pattern: {
              value: new RegExp(Constants.EMAIL_REGEX),
              message: ErrorStrings.INVALID_EMAIL,
            },
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      <div className="flex justify-between gap-2">
        <div className={`flex-1 ${styles.formGroup}`}>
          <label htmlFor="firsname" className={styles.label}>
            First Name:
          </label>
          <input
            id="firstname"
            type="text"
            className={styles.input}
            placeholder={DefaultStrings.FIRSTNAME_INPUT_PLACEHOLDER}
            {...register("firstname", { required: "Firstname is required" })}
          />
          {errors.firstname && (
            <p className={styles.errorMessage}>{errors.firstname.message}</p>
          )}
        </div>
        <div className={`flex-1 ${styles.formGroup}`}>
          <label htmlFor="lastname" className={styles.label}>
            Last Name:
          </label>
          <input
            id="lastname"
            type="text"
            className={styles.input}
            placeholder={DefaultStrings.LASTNAME_INPUT_PLACEHOLDER}
            {...register("lastname", { required: "Lastname is required" })}
          />
          {errors.lastname && (
            <p className={styles.errorMessage}>{errors.lastname.message}</p>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone_number" className={styles.label}>
          Phone Number:
        </label>
        <input
          id="firstname"
          type="tel"
          className={styles.input}
          maxLength={8}
          placeholder={DefaultStrings.PHONE_NUMBER_INPUT_PLACEHOLDER}
          {...register("phone_number", {
            required: "Phone number is required",
            pattern: {
              value: new RegExp(Constants.PHONE_NUMBER_REGEX),
              message: ErrorStrings.INVALID_PHONE_NUMBER,
            },
          })}
        />
        {errors.phone_number && (
          <p className={styles.errorMessage}>{errors.phone_number.message}</p>
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
          placeholder={DefaultStrings.PASSWORD_INPUT_PLACEHOLDER}
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: new RegExp(Constants.PASSWORD_REGEX),
              message: ErrorStrings.INVALID_PASSWORD,
            },
          })}
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
          placeholder={DefaultStrings.CONFIRM_PASSWORD_INPUT_PLACEHOLDER}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            pattern: {
              value: new RegExp(Constants.PASSWORD_REGEX),
              message: ErrorStrings.INVALID_PASSWORD,
            },
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
