import { useForm } from 'react-hook-form';
import { signup } from '../services/post.mjs';
import { jwtDecode } from 'jwt-decode';
import { useAppContext } from '../context/AppContext';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function SignUpUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const { setUser, user } = useAppContext();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await signup(data);
      if (response.status === 201) {
        const decoded = jwtDecode(response.data);
        setUser(decoded);
        console.log(user);
        window.localStorage.setItem('token', response.data);

        toast.success('Registered Successfully');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }

      console.log(data);
      console.log(response);
    } catch (error) {
      toast.error('Registration Failed');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='bg-zinc-500 p-2 flex flex-col gap-2 w-[500px] mx-auto'
      >
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Name'
          {...register('name', {
            required: 'Please enter your name',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type='text'
          name='lastname'
          id='lastname'
          placeholder='Lastname'
          {...register('lastName', {
            required: 'Please enter your lastname',
          })}
        />
        {errors.lastname && <p>{errors.lastname.message}</p>}

        <input
          type='email'
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
            required: 'Please enter a password',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters long',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type='password'
          name='repeatPassword'
          id='repeatPassword'
          placeholder='Repeat Password'
          {...register('repeatPassword', {
            required: 'Please confirm your password',
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return value === password || 'Passwords must match';
              },
            },
          })}
        />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

        <button type='submit'>Register🔥</button>
      </form>{' '}
      <Toaster richColors />
    </>
  );
}
