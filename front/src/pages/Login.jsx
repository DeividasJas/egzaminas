import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/post.mjs';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import { useAppContext } from '../context/AppContext';

// const login_url = import.meta.env.VITE_LOGIN || 'http://localhost:3001/v1/users/login';
// const url = import.meta.env.VITE_ENDPOINT
export default function LoginUser() {
  // console.log(url);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { setUser, user } = useAppContext();

  const onSubmit = async (data) => {
    console.log(data);
    const response = await login(data);
    console.log(response.status);

    if (response.status === 200) {
      const decoded = jwtDecode(response.data);
      setUser(decoded);
      console.log(user);
      window.localStorage.removeItem('token');
      window.localStorage.setItem('token', response.data);
      console.log(response.data);
      


      toast.success('Login Successful');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    }
  };

  return (
    <>
      <form
        action=''
        className='bg-zinc-500 p-2 flex flex-col gap-2 w-[500px] mx-auto'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input
          type='text'
          name='email'
          id='email'
          placeholder='Email'
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address format',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          {...register('password', {
            required: 'Please enter your password',
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type='submit'>Login</button>
      </form>
      <Toaster richColors />
    </>
  );
}
