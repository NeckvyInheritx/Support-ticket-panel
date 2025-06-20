'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { customerTicketsStatic } from '@/lib/data'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { TextArea } from '@/components/atoms/TextArea'
import { Select } from '@/components/atoms/Select'
import {
  TagIcon,
  EditIcon,
  ArrowLeftIcon,
  CalendarIcon,
} from '@/components/icons'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/molecules/Card' // Import our new Card components
import { Ticket } from '@/types/ticket'
import {
  getPriorityBadgeVariant,
  getStatusBadgeVariant,
} from '@/components/molecules/TicketCard'
import { ticketPriorityOptions } from '@/lib/constants/ticket'
import toast from 'react-hot-toast'

const ticketDetailValidationSchema = Yup.object({
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  priority: Yup.string().required('Priority is required'),
})

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ticketId = params.id as string

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Define initial values for Formik based on the current ticket
  const initialFormValues = useMemo(
    () => ({
      // Use optional chaining as ticket might be null initially
      description: ticket?.description || '',
      priority: ticket?.priority || '',
    }),
    [ticket],
  ) // Depend on the whole ticket object to re-evaluate when ticket is loaded/changes

  useEffect(() => {
    setLoading(true)
    const foundTicket = customerTicketsStatic.find((t) => t.id === ticketId)
    if (foundTicket) {
      setTicket(foundTicket)
    } else {
      console.error(`Ticket with ID ${ticketId} not found.`)
      // Consider a redirect or displaying a clear "not found" message
    }
    setLoading(false)
  }, [ticketId])

  const handleSave = async (
    values: typeof initialFormValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    console.log('Updating Ticket:', values)
    setSubmitting(true)
    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTicket((prevTicket) =>
      prevTicket
        ? {
            ...prevTicket,
            description: values.description,
            priority: values.priority as Ticket['priority'], // Explicitly cast to Ticket['priority']
            updatedAt: new Date().toISOString(),
          }
        : null,
    )
    setSubmitting(false)
    setIsEditing(false) // Exit edit mode after saving
    toast.success('Ticket updated successfully!') // Replace with a proper notification system
  }

  const handleCancel = (resetForm: () => void) => {
    resetForm() // Reset formik values to initial values
    setIsEditing(false) // Exit edit mode
  }

  useEffect(() => {
    setLoading(true)
    const foundTicket = customerTicketsStatic.find((t) => t.id === ticketId)
    if (foundTicket) {
      setTicket(foundTicket)
    } else {
      console.error(`Ticket with ID ${ticketId} not found.`)
      // Consider a redirect or displaying a clear "not found" message
    }
    setLoading(false)
  }, [ticketId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <ClipLoader size={50} color="#3B82F6" />
        <p className="ml-3 text-gray-700">Loading ticket details...</p>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <p className="text-xl text-red-600">Ticket not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back to List Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="inline-flex gap-2"
          >
            <ArrowLeftIcon />
            Back to List
          </Button>
        </div>

        {/* Main Ticket Card */}
        <Card>
          <CardHeader>
            {/* Title and Status Row */}
            <div className="flex justify-between items-center gap-6">
              <div className="flex-1 items-center">
                <CardTitle className="text-md md:text-2xl !font-bold">
                  {ticket.title}
                </CardTitle>
                <p className="text-sm text-gray-500 font-medium">
                  Ticket ID: {ticket.id}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  text={
                    ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)
                  }
                  className="px-4 py-2"
                  variant={getStatusBadgeVariant(ticket.status)}
                />
                {!isEditing && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setIsEditing(true)}
                    className="flex gap-2"
                    type="button"
                  >
                    <EditIcon size={16} />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <Formik
            initialValues={initialFormValues}
            validationSchema={ticketDetailValidationSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSave(values, setSubmitting)
            }
            enableReinitialize={true} // Reinitialize form when `ticket` object changes
          >
            {({
              values,
              handleChange,
              setFieldValue,
              touched,
              errors,
              isSubmitting,
              resetForm,
            }) => (
              <Form>
                <CardContent>
                  {/* Ticket Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Right Column */}
                    <div className="space-y-8">
                      {/* Priority - Editable */}
                      <div>
                        <CardTitle className="text-sm opacity-70 !font-bold text-gray-500 uppercase">
                          Priority
                        </CardTitle>
                        {isEditing ? (
                          <Select
                            value={values.priority}
                            onChange={(value) =>
                              setFieldValue('priority', value)
                            }
                            options={ticketPriorityOptions}
                            selectClassName="w-full md:w-40"
                            hasError={touched.priority && !!errors.priority}
                            errorMessage={
                              touched.priority ? errors.priority : undefined
                            }
                            allowClear={false}
                          />
                        ) : (
                          <Badge
                            text={
                              ticket.priority.charAt(0).toUpperCase() +
                              ticket.priority.slice(1)
                            }
                            variant={getPriorityBadgeVariant(ticket.priority)}
                          />
                        )}
                      </div>

                      {/* Created At */}
                      <div>
                        <CardTitle className="text-sm opacity-70 !font-bold text-gray-500 uppercase">
                          Created
                        </CardTitle>
                        <div className="flex items-center gap-3">
                          <CalendarIcon />
                          <span className="text-gray-800 font-medium">
                            {format(
                              new Date(ticket.createdAt),
                              'MMM dd, yyyy HH:mm',
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Left Column */}
                    <div className="space-y-8">
                      {/* Category */}
                      {ticket.category && (
                        <div>
                          <CardTitle className="text-sm opacity-70 !font-bold text-gray-500 uppercase">
                            Category
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <TagIcon />
                            <Badge text={ticket.category} variant="category" />
                          </div>
                        </div>
                      )}

                      {ticket.updatedAt && (
                        <div>
                          <CardTitle className="text-sm opacity-70 !font-bold text-gray-500 uppercase">
                            Last Updated
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <CalendarIcon />
                            <span className="text-gray-800 font-medium">
                              {format(
                                new Date(ticket.updatedAt),
                                'MMM dd, yyyy HH:mm',
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description Section - Editable */}
                  <div className="border-t border-gray-100 pt-8">
                      <CardTitle className="text-sm opacity-70 !font-bold text-gray-500 uppercase">
                        Description
                      </CardTitle>

                    {isEditing ? (
                      <div>
                        <TextArea
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          hasError={touched.description && !!errors.description}
                          errorMessage={
                            touched.description ? errors.description : undefined
                          }
                          placeholder="Enter ticket description..."
                        />
                      </div>
                    ) : (
                        <p className="text-gray-800 text-base">
                          {ticket.description}
                        </p>
                    )}
                  </div>
                </CardContent>

                {/* Save/Cancel Buttons - Visible only in editing mode */}
                {isEditing && (
                  <CardFooter className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleCancel(resetForm)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      className='!bg-blue-200'
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ClipLoader size={16} color="#fff" />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  )
}
