import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bem-vindo! Use o menu para navegar entre funcionalidades.</p>
      <div className="cards">
        <Link to="/rooms" className="card">Quartos</Link>
        <Link to="/reservations" className="card">Reservas</Link>
        <Link to="/clients" className="card">Clientes</Link>
        <Link to="/users" className="card">Usuários</Link>
      </div>
    </div>
  )
}
