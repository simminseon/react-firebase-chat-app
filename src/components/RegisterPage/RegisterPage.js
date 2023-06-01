import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h2>Register</h2>
      </div>
      <form
      // onSubmit={handleSubmit(onSubmit)}
      >
        <label>Email</label>
        <input
          name="email"
          type="email"
          //  {...register('example')}
        />
        <label>Name</label>
        <input
          name="name"
          //  {...register('exampleRequired', { required: true })}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          //  {...register('exampleRequired', { required: true })}
        />
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          //  {...register('exampleRequired', { required: true })}
        />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" />
        <Link to="login" style={{ color: 'gray', textDecoration: 'none' }}>
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
