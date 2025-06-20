'use client'
import Navbar from '@/components/orgmisms/Navbar'

interface DashboardPageProps {
  children: React.ReactNode;
}

const DashboardPage = ({children}:DashboardPageProps) => {

  return (
    <div>
      <div className="flex">
        <Navbar/>
      </div>
      <div className='bg-blue-50 h-full'>
      <div className='pt-8 container mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-64px)] overflow-y-auto'>
        {children}  
      </div>
      </div>
    </div>
  )
}

export default DashboardPage