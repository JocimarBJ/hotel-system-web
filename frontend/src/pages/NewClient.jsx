import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewClient(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [document,setDocument] = useState('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/clients', { name, email, phone, document });
      navigate('/clients');
    } catch(err) {
      setMsg(err.response?.data?.message || 'Erro');
    }
  }

  return (
    <div>
      <h2>Novo Cliente</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input placeholder="Documento (CPF)" value={document} onChange={e=>setDocument(e.target.value)} />
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
