import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewReservation(){
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [clientId, setClientId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{ load(); }, []);
  async function load(){
    const r1 = await api.get('/clients');
    const r2 = await api.get('/rooms');
    setClients(r1.data);
    setRooms(r2.data);
    if(r1.data[0]) setClientId(r1.data[0].id);
    if(r2.data[0]) setRoomId(r2.data[0].id);
  }

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/reservations', { clientId, roomId, checkIn, checkOut });
      navigate('/reservations');
    } catch(err) {
      setMsg(err.response?.data?.message || 'Erro');
    }
  }

  return (
    <div>
      <h2>Nova Reserva</h2>
      <form onSubmit={submit} className="form">
        <label>Cliente</label>
        <select value={clientId} onChange={e=>setClientId(e.target.value)}>
          {clients.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <label>Quarto</label>
        <select value={roomId} onChange={e=>setRoomId(e.target.value)}>
          {rooms.map(r=> <option key={r.id} value={r.id}>{r.number} - {r.type}</option>)}
        </select>

        <label>Check-in</label>
        <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />

        <label>Check-out</label>
        <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />

        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
