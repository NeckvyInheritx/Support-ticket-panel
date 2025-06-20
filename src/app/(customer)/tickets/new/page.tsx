'use client'
import { useRouter } from 'next/navigation'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners' // Assuming react-spinners is installed
import { Input } from '@/components/atoms/Input'
import { TextArea } from '@/components/atoms/TextArea' // New TextArea component
import { Select } from '@/components/atoms/Select'
import { Button } from '@/components/atoms/Button'

const ticketPriorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

const ticketCategoryOptions = [
  { value: 'Order & Delivery Issues', label: 'Order & Delivery Issues' },
  { value: 'Payments & Refunds', label: 'Payments & Refunds' },
  {
    value: 'Website & Technical Support',
    label: 'Website & Technical Support',
  },
  { value: 'Product Inquiries', label: 'Product Inquiries' },
  { value: 'Pharmacy & Health Services', label: 'Pharmacy & Health Services' },
  { value: 'Manufacturing & Wholesale', label: 'Manufacturing & Wholesale' },
  {
    value: 'Accounts & Profile Management',
    label: 'Accounts & Profile Management',
  },
  {
    value: 'Feedback & General Enquiries',
    label: 'Feedback & General Enquiries',
  },
]

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Ticket title is required'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  priority: Yup.string().required('Priority is required'),
  category: Yup.string().required('Category is required'),
})

export default function NewTicketPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create New Support Ticket
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill out the form below to submit a new ticket. Our team will get
              back to you shortly.
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{
              title: '',
              description: '',
              priority: '', // Empty string for initial value, allowing placeholder
              category: '', // Empty string for initial value, allowing placeholder
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('New Ticket Data:', values)
              // Simulate API call for ticket creation
              setTimeout(() => {
                setSubmitting(false)
                resetForm() // Clear form after submission
                router.push('/dashboard') // Redirect to dashboard after creation
                alert('Ticket submitted successfully!') // Use a custom message box in a real app
              }, 1500)
            }}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form className="space-y-6">
                {/* Ticket Title Field */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ticket Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    hasError={touched.title && !!errors.title}
                    placeholder="e.g., Unable to access account"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <TextArea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    hasError={touched.description && !!errors.description}
                    placeholder="Please provide a detailed description of your issue..."
                    className="w-full min-h-[120px]" // Min height for description area
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Priority Select Field */}
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Priority
                  </label>
                  <Select
                    id="priority"
                    placeholder="Select Priority"
                    value={values.priority}
                    onChange={(value) => setFieldValue('priority', value)} // Formik's setFieldValue for Select
                    options={ticketPriorityOptions}
                    hasError={touched.priority && !!errors.priority}
                    selectClassName="w-full"
                    allowClear // Allow clearing the selection
                  />
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Category Select Field */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <Select
                    id="category"
                    placeholder="Select Category"
                    value={values.category}
                    onChange={(value) => setFieldValue('category', value)} // Formik's setFieldValue for Select
                    options={ticketCategoryOptions}
                    hasError={touched.category && !!errors.category}
                    selectClassName="w-full"
                    allowClear // Allow clearing the selection
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full py-2.5 mt-6" // Adjusted padding and margin-top
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
                      <span className="ml-2">Submitting...</span>
                    </div>
                  ) : (
                    'Submit Ticket'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
