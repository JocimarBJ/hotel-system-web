import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditClient(){
  const [client,setClient] = useState(null);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{ load(); }, []);
  async function load(){
    try {
      const res = await api.get('/clients/' + id);
      setClient(res.data);
    } catch(err) { setMsg('Erro ao carregar'); }
  }

  async function submit(e){
    e.preventDefault();
    try {
      await api.put('/clients/' + id, client);
      navigate('/clients');
    } catch(err) { setMsg('Erro ao salvar'); }
  }

  if(!client) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Cliente</h2>
      <form onSubmit={submit} className="form">
        <input value={client.name} onChange={e=>setClient({...client, name: e.target.value})} />
        <input value={client.email} onChange={e=>setClient({...client, email: e.target.value})} />
        <input value={client.phone} onChange={e=>setClient({...client, phone: e.target.value})} />
        <input value={client.document} onChange={e=>setClient({...client, document: e.target.value})} />
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
