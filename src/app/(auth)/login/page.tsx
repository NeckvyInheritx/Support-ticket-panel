'use client'
import { useRouter } from 'next/navigation'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Login failed')
      }
      return res.json()
    },
    onSuccess: (data) => {
      // Assuming API returns { user: { id, name, email }, token }
      login(data.user.email, data.user.name, data.user.id)
      localStorage.setItem('token', data.token)
      toast.success('Login successful!')
      router.push('/dashboard')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Login failed')
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-pale-sky">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-3xl font-bold text-gray-900 !mb-0">Sign in</p>
            <p className="mt-2 text-sm text-gray-600">
              Access your support panel account
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              loginMutation.mutate(values)
            }}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    hasError={touched.email && !!errors.email}
                    placeholder="you@example.com"
                    className="w-full"
                  />
                  <ErrorMessage 
                    name="email" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label 
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    hasError={touched.password && !!errors.password}
                    placeholder="Enter your password"
                    className="w-full"
                  />
                  <ErrorMessage 
                    name="password" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a 
                      href="#" 
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div> */}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={loginMutation.isPending}
                  variant='primary'
                  className='w-full'
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <ClipLoader
                        color="#ffffff"
                        loading={loginMutation.isPending}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Button>

                {/* Sign up link */}
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link 
                      href="/signup" 
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Footer text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}