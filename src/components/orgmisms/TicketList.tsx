import { Ticket } from '@/types/ticket'
import React from 'react'
import { TicketCard } from '../molecules/TicketCard'

interface TicketListProps {
  tickets: Ticket[]
}

export const TicketList = ({ tickets }: TicketListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
      {tickets.length > 0 ? (
        tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
      ) : (
        <div className="col-span-full text-center py-10 text-gray-500 text-lg">
          No tickets found matching your criteria.
        </div>
      )}
    </div>
  )
}
