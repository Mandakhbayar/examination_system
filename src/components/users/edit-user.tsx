import axiosInterceptorInstance from "@/config/api-interceptor";
import { AlertType, User } from "@/utils/types";
import styles from "@/styles/auth.module.css";
import Alert from "../ui/alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { DefaultStrings, ErrorStrings } from "@/utils/strings";
import { Constants } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function EditUserForm({ user }: { user: User | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ defaultValues: user ?? undefined });
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data) => {
    setMessage(null);
    setAlertType("error");
    if(!user || user.id == undefined) {
        setMessage("Error updating user");
        return;
    }
    try {
      await axiosInterceptorInstance.put(`/users/${user.id}`, {...data, id: user.id});
      setAlertType("success");
      setMessage("Successful!");
    } catch (err) {
        console.log(err)
      setMessage("Error updating user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainerUser}
    >
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
        <label htmlFor="phoneNumber" className={styles.label}>
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
        <div className="flex gap-2">
        <button onClick={()=>{router.back()}} className={styles.secondButton}>
          Back
        </button>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
        
        </div>
    </form>
  );
}
