// components/LoginForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from '@/styles/auth.module.css';
import Alert from '../ui/alert';
import { useRouter } from "next/navigation";
import { Routes } from '../../utils/routes';
import useAuth from '../../hooks/use-auth';
import { AlertType } from '../../utils/types';
import { DefaultStrings } from '../../utils/strings';

interface LoginFormType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);
  const {login, user} = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormType> = async (data:LoginFormType) => {
    setMessage(null);
    
    try {
      await login(data.email, data.password)
      setAlertType("success");
      setMessage('Login successful!');
    } catch (err) {
      setAlertType("error");
      setMessage('Failed to login. Please try again.');
    }
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(Routes.auth.register);
  };

  useEffect(()=>{
    if(user){
      router.push(Routes.private.lessons);
    }
  },[user])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.title}>Login</label>
      {message && <Alert message={message} type={alertType}/>}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder={DefaultStrings.EMAIL_INPUT_PLACEHOLDER}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder={DefaultStrings.PASSWORD_INPUT_PLACEHOLDER}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
      </div>
      
      <button type="submit" className={styles.submitButton}>Login</button>
      <button onClick={handleRegisterClick} className={styles.secondButton}>Create new account</button>
    </form>
  );
};
