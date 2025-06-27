'use client'
import React from 'react'
import { Input } from '@/components/atoms/Input'
import { Select } from '@/components/atoms/Select'
import { FilterIcon, SearchIcon, SortIcon } from '../icons'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
]

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}: SearchBarProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border mb-6">
      <div className="flex flex-col justify-between md:flex-row gap-4 items-center">
        <div className="relative bg-blue-50 w-full md:!w-[384px] rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
            <SearchIcon />
          </div>
          <Input
            type="text"
            placeholder="Search tickets by title or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-none"
          />
        </div>

        <div className="block md:flex w-full md:w-auto gap-4 items-center">
          <div className="flex items-center gap-2 w-full mb-2 md:mb-0">
            <FilterIcon />
            <div className="w-full">
              <Select
                placeholder="All Statuses"
                value={statusFilter}
                onChange={onStatusChange}
                options={statusOptions}
                selectClassName=" w-full md:w-[160px]"
                allowClear
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <SortIcon />
            <div className="w-full">
              <Select
                placeholder="Sort by"
                value={sortBy}
                onChange={onSortChange}
                options={sortOptions}
                selectClassName="w-full md:w-[160px]"
                allowClear
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
