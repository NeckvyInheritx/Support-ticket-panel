'use client'
import Navbar from '@/components/orgmisms/Navbar'

interface DashboardPageProps {
  children: React.ReactNode
}

const DashboardPage = ({ children }: DashboardPageProps) => {
  return (
    <div>
      <Navbar />
      <div className="bg-blue-50 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="mx-auto pt-8  px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  )
}

export default DashboardPage
