import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef(null);

  const onSubmit = (data) => console.log(data);
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h2>Register</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input name="name" {...register('name', { required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === 'required' && <p>This name field is required</p>}
        {errors.name && errors.name.type === 'maxLength' && <p>Your input exceed maximum length</p>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
          ref={password}
        />
        {errors.password && errors.name.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.name.type === 'minLength' && (
          <p>Password must have at 6 characters</p>
        )}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register('password_confirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm && errors.name.type === 'required' && (
          <p>This password confirm field is required</p>
        )}
        {errors.password_confirm && errors.name.type === 'validate' && (
          <p>The passwords do not match</p>
        )}

        <input type="submit" />
        <Link to="login" style={{ color: 'gray', textDecoration: 'none' }}>
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
