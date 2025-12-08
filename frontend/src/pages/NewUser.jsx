import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewUser(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('user');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      await api.post('/users', { name, email, password, role });
      navigate('/users');
    } catch(err) { setMsg(err.response?.data?.message || 'Erro'); }
  }

  return (
    <div>
      <h2>Novo Usuário</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  )
}
