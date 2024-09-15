// components/LoginForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import styles from '@/styles/auth.module.css';
import Alert from '../ui/alert';
import { useRouter } from "next/navigation";
import { Routes } from '../../utils/routes';
import useAuth from '../../hooks/use-auth';

interface LoginFormType {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
  const [error, setError] = useState<string | null>(null);
  const {login} = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormType> = async (data:LoginFormType) => {
    setError(null);
    
    try {
      await login(data.email, data.password)
      alert('Login successful!');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(Routes.auth.register);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label className={styles.title}>Login</label>
      {error && <Alert message={error} type='error'/>}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          id="email"
          type="email"
          className={styles.input}
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
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
      </div>
      
      <button type="submit" className={styles.submitButton}>Login</button>
      <button onClick={handleRegisterClick} className={styles.secondButton}>Register</button>
    </form>
  );
};
