import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at 6 characters</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link to="/register" style={{ color: 'gray', textDecoration: 'none' }}>
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
