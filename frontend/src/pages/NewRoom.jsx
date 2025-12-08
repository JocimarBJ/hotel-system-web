import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewRoom(){
  const [number,setNumber] = useState('');
  const [type,setType] = useState('');
  const [daily,setDaily] = useState('');
  const [available,setAvailable] = useState(true);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/rooms', { number, type, daily, available });
      navigate('/rooms');
    } catch(err) { setMsg(err.response?.data?.message || 'Erro'); }
  }

  return (
    <div>
      <h2>Novo Quarto</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Número" value={number} onChange={e=>setNumber(e.target.value)} required />
        <input placeholder="Tipo" value={type} onChange={e=>setType(e.target.value)} />
        <input placeholder="Diária" value={daily} onChange={e=>setDaily(e.target.value)} type="number" step="0.01" />
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={available} onChange={e=>setAvailable(e.target.checked)}
          />
          <span>Disponível</span>
        </label>
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
