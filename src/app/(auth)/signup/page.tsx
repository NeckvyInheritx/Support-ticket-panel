'use client'
import { useRouter } from 'next/navigation'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must agree to the Terms of Service and Privacy Policy')
      .required('You must agree to the Terms of Service and Privacy Policy'),
  })

export default function SignupForm() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join our support panel community
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ 
              firstName: '', 
              lastName: '', 
              email: '', 
              password: '', 
              confirmPassword: '',
              agreeToTerms: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('New user signup:', {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                agreeToTerms: values.agreeToTerms
              })
              // Simulate API call
              setTimeout(() => {
                setSubmitting(false)
                router.push('/dashboard')
              }, 1500)
            }}
          >
            {({ values, handleChange, touched, errors, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label 
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      hasError={touched.firstName && !!errors.firstName}
                      placeholder="John"
                      className="w-full"
                    />
                    <ErrorMessage 
                      name="firstName" 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label 
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      hasError={touched.lastName && !!errors.lastName}
                      placeholder="Doe"
                      className="w-full"
                    />
                    <ErrorMessage 
                      name="lastName" 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>
                </div>

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
                    placeholder="john.doe@example.com"
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
                    placeholder="Create a strong password"
                    className="w-full"
                  />
                  <ErrorMessage 
                    name="password" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                  {/* Password Requirements */}
                  <div className="mt-2 text-xs text-gray-500">
                    Password must contain at least 8 characters with uppercase, lowercase, and number
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label 
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    hasError={touched.confirmPassword && !!errors.confirmPassword}
                    placeholder="Confirm your password"
                    className="w-full"
                  />
                  <ErrorMessage 
                    name="confirmPassword" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                {/* Terms Agreement */}
                <div>
                  <div className="flex items-start">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={values.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link href="#" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="#" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <ErrorMessage 
                    name="agreeToTerms" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

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
                      <span className="ml-2">Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Login link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      href="/login" 
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign in here
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
            By creating an account, you agree to receive emails about support updates and relevant information.
          </p>
        </div>
      </div>
    </div>
  )
}