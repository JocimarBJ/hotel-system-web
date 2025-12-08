import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRoom(){
  const [room,setRoom] = useState(null);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{ load(); }, []);
  async function load(){
    try {
      const res = await api.get('/rooms/' + id);
      setRoom(res.data);
    } catch(err) { setMsg('Erro ao carregar'); }
  }

  async function submit(e){
    e.preventDefault();
    try {
      await api.put('/rooms/' + id, room);
      navigate('/rooms');
    } catch(err) { setMsg('Erro ao salvar'); }
  }

  if(!room) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Quarto</h2>
      <form onSubmit={submit} className="form">
        <input value={room.number} onChange={e=>setRoom({...room, number: e.target.value})} />
        <input value={room.type} onChange={e=>setRoom({...room, type: e.target.value})} />
        <input value={room.daily} onChange={e=>setRoom({...room, daily: e.target.value})} type="number" step="0.01" />
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={room.available}
            onChange={e => setRoom({ ...room, available: e.target.checked })}
          />
          <span>Disponível</span>
        </label>
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
