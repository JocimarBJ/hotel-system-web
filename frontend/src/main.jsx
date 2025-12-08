import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import Login from './pages/Login'
import Rooms from './pages/Rooms'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Reservations from './pages/Reservations'
import NewReservation from './pages/NewReservation'
import NewClient from './pages/NewClient'
import NewRoom from './pages/NewRoom'
import EditClient from './pages/EditClient'
import EditRoom from './pages/EditRoom'
import Users from './pages/Users'
import NewUser from './pages/NewUser'

import ProtectedRoute from './components/ProtectedRoute'

import './styles/style.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <App/>
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard/>} />
          <Route path="rooms" element={<Rooms/>} />
          <Route path="rooms/new" element={<NewRoom/>} />
          <Route path="rooms/edit/:id" element={<EditRoom/>} />

          <Route path="reservations" element={<Reservations/>} />
          <Route path="reservations/new" element={<NewReservation/>} />

          <Route path="clients" element={<Clients/>} />
          <Route path="clients/new" element={<NewClient/>} />
          <Route path="clients/edit/:id" element={<EditClient/>} />

          <Route path="users" element={<Users/>} />
          <Route path="users/new" element={<NewUser/>} />
        </Route>

        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
