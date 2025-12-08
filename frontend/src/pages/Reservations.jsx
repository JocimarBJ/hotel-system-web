import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Reservations(){
  const [reservations, setReservations] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    try {
      const res = await api.get('/reservations');
      setReservations(res.data);
    } catch(err) {
      console.error(err);
      setReservations([]);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir esta reserva?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/reservations/${id}`);
      load(); // recarrega a lista de reservas
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir reserva.");
    }
  }

  return (
    <div>
      <div className="page-top">
        <h2>Reservas</h2>
        <Link to="/reservations/new" className="btn">Nova Reserva</Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Quarto</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Noites</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => {
            // suporte defensivo caso backend retorne nomes em camelCase/maiúsculo/lowercase
            const client = r.Client || r.client || null;
            const room = r.Room || r.room || null;

            const clientLabel = client ? (client.name || client.nome || `#${r.clientId}`) : `#${r.clientId}`;
            const roomLabel = room ? (room.number || room.numero || `#${r.roomId}`) : `#${r.roomId}`;

            // calcula noites com JS simples (fallback)
            const checkIn = r.checkIn || r.check_in;
            const checkOut = r.checkOut || r.check_out;
            let nights = '';
            try {
              const d1 = new Date(checkIn);
              const d2 = new Date(checkOut);
              nights = Math.max(0, Math.round((d2 - d1) / (1000*60*60*24)));
            } catch(e) { nights = ''; }

            return (
              <tr key={r.id}>
                <td>{clientLabel}</td>
                <td>{roomLabel}</td>
                <td>{checkIn}</td>
                <td>{checkOut}</td>
                <td>{nights}</td>
                <td>R$ {Number(r.total || 0).toFixed(2)}</td>
                <td><button className="btn-delete" onClick={() => handleDelete(r.id)}>Excluir</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
