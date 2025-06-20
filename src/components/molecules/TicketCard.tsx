import { Ticket } from '@/types/ticket'
import { Badge } from '../atoms/Badge'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card'
import Avatar from '../atoms/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, TagIcon, UserIcon } from '../icons'

interface TicketCardProps {
  ticket: Ticket
}

// Determine badge variant for status
export const getStatusBadgeVariant = (
  status: Ticket['status'],
): Parameters<typeof Badge>[0]['variant'] => {
  switch (status) {
    case 'open':
      return 'open'
    case 'in-progress':
      return 'in-progress'
    case 'resolved':
      return 'resolved'
    case 'closed':
      return 'closed'
    default:
      return 'default'
  }
}

// Determine badge variant for priority
export const getPriorityBadgeVariant = (
  priority: Ticket['priority'],
): Parameters<typeof Badge>[0]['variant'] => {
  switch (priority) {
    case 'low':
      return 'low-priority'
    case 'medium':
      return 'medium-priority'
    case 'high':
      return 'high-priority'
    case 'urgent':
      return 'urgent-priority'
    default:
      return 'default'
  }
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="hover:shadow-lg transition-shadow duration-200 rounded-lg"
    >
      <Card
        className="h-full flex flex-col"
        data-testid={`ticket-card-${ticket.id}`}
      >
        {/* Card Header Section */}
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 hover:text-blue-600 transition-colors">
                {ticket.title}
              </CardTitle>
              <p className="text-sm text-gray-500">ID: {ticket.id}</p>
            </div>
            {/* Using Badge atom directly for status */}
            <Badge
              text={
                ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)
              }
              variant={getStatusBadgeVariant(ticket.status)}
            />
          </div>
        </CardHeader>

        {/* Card Content Section */}
        <CardContent className="flex-grow pb-4 space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <span>
                {formatDistanceToNow(new Date(ticket.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {ticket.category && (
              <div className="flex items-center gap-1.5">
                <TagIcon />
                {/* Using Badge atom directly for category */}
                <Badge text={ticket.category} variant="category" />
              </div>
            )}
            <div className="flex items-center gap-1.5">
              {/* Using Badge atom directly for priority */}
              <Badge
                text={`${ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority`}
                variant={getPriorityBadgeVariant(ticket.priority)}
              />
            </div>
          </div>
        </CardContent>

        {/* Card Footer Section */}
        <CardFooter className="flex justify-between items-center text-xs pt-3">
          <div className="flex items-center gap-2">
            {ticket.assignedAgentName && (
              <>
                {/* Using our custom Avatar component */}
                <Avatar
                  size="small" // 'small' size for Avatar, corresponding to w-8 h-8
                  name={ticket.assignedAgentName}
                  // You can add an actual src here if you have agent avatars, e.g.:
                  // src={`/avatars/${ticket.assignedAgentName.toLowerCase().replace(/\s/g, '-')}.png`}
                />
                <span className="text-gray-600">
                  {ticket.assignedAgentName}
                </span>
              </>
            )}
            {!ticket.assignedAgentName && (
              <span className="text-gray-600 italic">Unassigned</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
