import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './styles/nav.css';

export default function App(){
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className="container">
      <header className="app-header">
        <h1 className='nav-title'><Link to="/">HotelApp</Link></h1>
        <nav className="nav">
          <Link to="/">Início</Link>
          <Link to="/rooms">Quartos</Link>
          <Link to="/reservations">Reservas</Link>
          <Link to="/clients">Clientes</Link>
          <button className="logout-btn" onClick={logout}>Sair</button>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
