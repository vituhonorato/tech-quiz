//import Link from 'next/link';
import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import SignInGoogleBtn from '@/components/SignInGoogleBtn';
import SignInFacebookBtn from '@/components/SignInFacebookBtn';
import SignInGithubBtn from '@/components/SignInGithubBtn';
import Link from 'next/link';
import SignInLinkedinBtn from '@/components/signInLinkedinBtn';

interface FormType {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { data: session } = useSession();
  const router: any = useRouter();
  const { redirect }: any = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const submitHandler = async ({ email, password }: FormType) => {
    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <div className='h-screen'>
      <div className="pt-14">
        <form
          className="mx-auto max-w-screen-md bg-white bg-opacity-80  rounded-sm p-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Logar</h1>
          <div className='flex flex-col justify-center'>

<SignInGoogleBtn/>
<SignInLinkedinBtn/>
<SignInFacebookBtn/>
<SignInGithubBtn/>

</div>
          <div className="mb-4 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full"
              id="email"
              autoFocus
              {...register('email', {
                required: 'Por favor insira um email válido',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Por favor use um formato de email válido',
                },
              })}
            />
            {errors.email && (
              <div className="text-red">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="w-full"
              id="password"
              autoFocus
              {...register('password', {
                required: 'Por favor insira uma senha válida',
                minLength: {
                  value: 5,
                  message: 'A senha dever ter no mínimo 5 caracteres ',
                },
              })}
            />
            {errors.password && (
              <div className="text-red">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button className="login-button">Login</button>
          </div>
          <div className="mb-4">
            Ainda não se cadastrou? &nbsp;
            <Link
              className="text-indigo-600  rounded-lg p-1 font-semibold"
              href="/register"
            >
              Registrar
            </Link>
          </div>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default LoginScreen;
