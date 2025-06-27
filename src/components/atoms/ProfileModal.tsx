'use client'

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Button from './Button'

interface ProfileModalProps {
  onLogout: () => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onLogout }) => {
  const { user } = useAuth()

  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : 'N/A'

  if (!user) return null

  return (
    <div className="absolute top-12 right-0 z-50 bg-white shadow-xl rounded-lg p-4 w-64 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Profile Info</h3>
      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <div>
          <strong>Name:</strong> {fullName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
      </div>
      <Button
        variant="outline"
        size="small"
        className="w-full"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  )
}

export default ProfileModal
