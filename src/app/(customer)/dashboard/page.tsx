'use client'
import { Button } from '@/components/atoms/Button'
import { SearchBar } from '@/components/molecules/SearchBar'
import { TicketList } from '@/components/orgmisms/TicketList'
import { customerTicketsStatic } from '@/lib/data'
import { Ticket } from '@/types/ticket'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const ticketsData = useMemo(() => {
    return [...customerTicketsStatic]
  }, [])

  const filteredAndSortedTickets = useMemo(() => {
    let tempTickets = [...ticketsData]

    // 1. Filter by search term
    if (searchTerm) {
      tempTickets = tempTickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // 2. Filter by status
    if (statusFilter && statusFilter !== 'all') {
      tempTickets = tempTickets.filter(
        (ticket) => ticket.status === statusFilter,
      )
    }

    // 3. Sorting
    tempTickets.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      if (sortBy === 'priority') {
        const priorityOrder: Record<Ticket['priority'], number> = {
          urgent: 4,
          high: 3,
          medium: 2,
          low: 1,
        }
        const aPriorityValue = priorityOrder[a.priority] || 0
        const bPriorityValue = priorityOrder[b.priority] || 0
        return bPriorityValue - aPriorityValue
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      }
      return 0
    })

    return tempTickets
  }, [searchTerm, statusFilter, sortBy, ticketsData])
  return (
    <div className="">
      <div className="space-y-6 max-w-[1304px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-headline font-semibold text-black">
            Support Tickets Dashboard
          </h1>
          <Link href="/tickets/new">
            <Button
              variant="primary"
              size="medium"
              className="flex items-center"
            >
              Create New Ticket
            </Button>
          </Link>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <TicketList tickets={filteredAndSortedTickets} />
      </div>
    </div>
  )
}
