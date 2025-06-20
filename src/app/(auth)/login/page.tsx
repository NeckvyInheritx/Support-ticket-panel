'use client'
import { useRouter } from 'next/navigation'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'
import Loader from '@/app/loading'

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
  // This component handles the login form with validation and submission
  // It uses Formik for form state management and Yup for validation
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your support panel account
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Logged in as:', values.email)
              // Simulate API call
              setTimeout(() => {
                setSubmitting(false)
                router.push('/dashboard')
              }, 1000)
            }}
          >
            {({ values, handleChange, touched, errors, isSubmitting }) => (
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
                  disabled={isSubmitting}
                  variant='primary'
                  className='w-full'
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <ClipLoader
                        color="#ffffff"
                        loading={isSubmitting}
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
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
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