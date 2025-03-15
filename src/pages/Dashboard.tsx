import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../features/auth/authSlice'

export default function Dashboard() {
    const user = useAppSelector(selectUser);
  return (
    <div>Dashboard {user?.username}</div>

  )
}
