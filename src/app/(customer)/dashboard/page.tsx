// 'use client'
// import { Button } from '@/components/atoms/Button'
// import { SearchBar } from '@/components/molecules/SearchBar'
// import { TicketList } from '@/components/orgmisms/TicketList'
// import { customerTicketsStatic } from '@/lib/data'
// import { Ticket } from '@/types/ticket'
// import Link from 'next/link'
// import { useMemo, useState } from 'react'

// export default function DashboardPage() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [sortBy, setSortBy] = useState('newest')

//   const ticketsData = useMemo(() => {
//     return [...customerTicketsStatic]
//   }, [])

//   const filteredAndSortedTickets = useMemo(() => {
//     let tempTickets = [...ticketsData]

//     // 1. Filter by search term
//     if (searchTerm) {
//       tempTickets = tempTickets.filter(
//         (ticket) =>
//           ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     // 2. Filter by status
//     if (statusFilter && statusFilter !== 'all') {
//       tempTickets = tempTickets.filter(
//         (ticket) => ticket.status === statusFilter,
//       )
//     }

//     // 3. Sorting
//     tempTickets.sort((a, b) => {
//       if (sortBy === 'newest') {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       }
//       if (sortBy === 'oldest') {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       }
//       if (sortBy === 'priority') {
//         const priorityOrder: Record<Ticket['priority'], number> = {
//           urgent: 4,
//           high: 3,
//           medium: 2,
//           low: 1,
//         }
//         const aPriorityValue = priorityOrder[a.priority] || 0
//         const bPriorityValue = priorityOrder[b.priority] || 0
//         return bPriorityValue - aPriorityValue
//       }
//       if (sortBy === 'status') {
//         return a.status.localeCompare(b.status)
//       }
//       return 0
//     })

//     return tempTickets
//   }, [searchTerm, statusFilter, sortBy, ticketsData])
//   return (
//     <div className="">
//       <div className="space-y-6 max-w-[1304px] mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-3xl font-headline font-semibold text-black">
//             Support Tickets Dashboard
//           </h1>
//           <Link href="/tickets/new">
//             <Button
//               variant="primary"
//               size="medium"
//               className="flex items-center"
//             >
//               Create New Ticket
//             </Button>
//           </Link>
//         </div>
//         <SearchBar
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           statusFilter={statusFilter}
//           onStatusChange={setStatusFilter}
//           sortBy={sortBy}
//           onSortChange={setSortBy}
//         />
//         <TicketList tickets={filteredAndSortedTickets} />
//       </div>
//     </div>
//   )
// }


'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/atoms/Button'
import { SearchBar } from '@/components/molecules/SearchBar'
import { TicketList } from '@/components/orgmisms/TicketList'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Ticket } from '@/types/ticket'

// Optional: Define response type for clarity (based on API response)
interface TicketApiResponse {
  items: any[]   // Raw API tickets; we'll transform these
  total: number
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [page, setPage] = useState(1)
  const limit = 10

  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) setToken(localToken)
  }, [])

  const { data, isLoading, isError } = useQuery<TicketApiResponse>({
    queryKey: ['tickets', { searchTerm, statusFilter, sortBy, page, limit }],
    enabled: !!token,
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter)
      if (searchTerm) params.append('search', searchTerm)
      params.append('sort', sortBy === 'newest' ? 'desc' : 'asc')
      params.append('page', String(page))
      params.append('limit', String(limit))

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
      const res = await axios.get(`${baseUrl}/ticket?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      // Transform backend tickets: assign _id to id
      const transformedData = {
        total: res.data.total,
        items: res.data.items.map((ticket: any) => ({
          ...ticket,
          id: ticket._id, // Transform _id from API to id for frontend use
        })),
      }
      return transformedData
    },
  })

  const handleSortChange = (value: string) => {
    if (['newest', 'oldest'].includes(value)) {
      setSortBy(value as typeof sortBy)
      setPage(1)
    }
  }

  return (
    <div className="">
      <div className="space-y-6 max-w-[1304px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-headline font-semibold text-black">
            Support Tickets Dashboard
          </h1>
          <Link href="/tickets/new">
            <Button variant="primary" size="medium" className="flex items-center">
              Create New Ticket
            </Button>
          </Link>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val)
            setPage(1)
          }}
          statusFilter={statusFilter}
          onStatusChange={(val) => {
            setStatusFilter(val)
            setPage(1)
          }}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {isLoading && <div>Loading tickets...</div>}
        {isError && <div>Error fetching tickets</div>}
        {!isLoading && data && <TicketList tickets={data.items ?? []} />}

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={() => setPage((p) => p + 1)} disabled={(data?.items?.length ?? 0) < limit}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
